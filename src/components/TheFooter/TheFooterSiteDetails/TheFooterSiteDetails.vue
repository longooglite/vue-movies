<script setup lang="ts">
import { computed, ref } from 'vue'
import testResults from '../../../../test-results.json'
import coverageSummary from '../../../../coverage/coverage-summary.json'
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue'

type CoverageTotals = {
  lines: { pct: number; covered: number; total: number }
  statements: { pct: number; covered: number; total: number }
  functions: { pct: number; covered: number; total: number }
  branches: { pct: number; covered: number; total: number }
}

// Percentage of passed tests (from test-results.json)
const testsPassRatePct = computed<number | null>(() => {
  const total = (testResults as any)?.numTotalTests ?? 0
  if (!total) return null
  const passed = (testResults as any)?.numPassedTests ?? 0
  return Math.round((passed / total) * 100)
})

// Total coverage percentage (use lines % as canonical)
const totalCoveragePct = computed<number | null>(() => {
  const totals = (coverageSummary as any)?.total as CoverageTotals | undefined
  if (!totals) return null
  return Math.round(totals.lines.pct)
})

// Aggregate per-directory coverage from coverage-summary.json
const coverageByDirectory = computed<
  Array<{
    dir: string
    files: number
    linesPct: number
    statementsPct: number
    functionsPct: number
    branchesPct: number
  }>
>(() => {
  const summary = coverageSummary as Record<
    string,
    {
      lines: { covered: number; total: number }
      statements: { covered: number; total: number }
      functions: { covered: number; total: number }
      branches: { covered: number; total: number }
    }
  >

  const byDir = new Map<
    string,
    {
      files: number
      _lines: { covered: number; total: number }
      _statements: { covered: number; total: number }
      _functions: { covered: number; total: number }
      _branches: { covered: number; total: number }
    }
  >()

  const add = (
    acc: { covered: number; total: number },
    inc: { covered: number; total: number } | undefined,
  ) => ({
    covered: acc.covered + (inc?.covered ?? 0),
    total: acc.total + (inc?.total ?? 0),
  })

  for (const [path, value] of Object.entries(summary)) {
    if (path === 'total') continue
    const lastSlash = path.lastIndexOf('/')
    const dir = lastSlash >= 0 ? path.slice(0, lastSlash) : '.'

    const current =
      byDir.get(dir) ??
      {
        files: 0,
        _lines: { covered: 0, total: 0 },
        _statements: { covered: 0, total: 0 },
        _functions: { covered: 0, total: 0 },
        _branches: { covered: 0, total: 0 },
      }

    current.files += 1
    current._lines = add(current._lines, value.lines)
    current._statements = add(current._statements, value.statements)
    current._functions = add(current._functions, value.functions)
    current._branches = add(current._branches, value.branches)
    byDir.set(dir, current)
  }

  const pct = (covered: number, total: number) =>
    total === 0 ? 100 : Math.round((covered / total) * 100)

  return Array.from(byDir.entries())
    .map(([dir, v]) => ({
      dir,
      files: v.files,
      linesPct: pct(v._lines.covered, v._lines.total),
      statementsPct: pct(v._statements.covered, v._statements.total),
      functionsPct: pct(v._functions.covered, v._functions.total),
      branchesPct: pct(v._branches.covered, v._branches.total),
    }))
    .sort((a, b) => a.dir.localeCompare(b.dir))
})

const coverageByDirectoryVisible = ref(false)
const toggleCoverageByDirectory = () => {
  coverageByDirectoryVisible.value = !coverageByDirectoryVisible.value
}
</script>
<template>
    <div class="the-footer-site-details">
        <p>Unit test coverage: {{ totalCoveragePct ?? 'N/A' }}%</p>
        <p>Tests pass rate: {{ testsPassRatePct ?? 'N/A' }}%</p>
        <button @click="toggleCoverageByDirectory">
            Full coverage report
            <PhCaretDown v-show="!coverageByDirectoryVisible" />
            <PhCaretUp v-show="coverageByDirectoryVisible" />
        </button>
        <ul v-show="coverageByDirectoryVisible">
            <li v-for="d in coverageByDirectory" :key="d.dir">
                {{ d.dir }} — {{ d.linesPct }}% lines, {{ d.statementsPct }}% stmts, {{ d.functionsPct }}% funcs, {{ d.branchesPct }}% branches
            </li>
        </ul>
    </div>
</template>
<style scoped>
.the-footer-site-details {
    width: calc(50% - 7px);
}
</style>