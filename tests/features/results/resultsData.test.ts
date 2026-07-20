import { resultsPageData } from '../../../src/features/results/data/resultsData';

describe('resultsPageData', () => {
  it('expose les KPIs principaux', () => {
    expect(resultsPageData.kpis.successRate.value).toBe('81%');
    expect(resultsPageData.kpis.acquiredSkills.value).toBe('6 / 8');
    expect(resultsPageData.kpis.improvementTracks.value).toBe('3');
  });

  it('contient des blocs de feedback', () => {
    expect(resultsPageData.feedbackBlocks.length).toBeGreaterThanOrEqual(2);
    expect(resultsPageData.feedbackBlocks[0].title).toBe('Forces');
  });
});
