import { describe, it, expect } from 'vitest';
import moment from 'moment';
import {
  computeNextScoreReactionDate,
  computeScoreFromExpectedTime,
  computeTimeFromExpectedScore,
  type DecayRule,
  FALLBACK_DECAY_RULE,
  findDecayRuleForIndicator
} from '../../../src/modules/indicator/decay-domain';

describe('Decay formula testing', () => {
  it('should compute score', () => {
    const baseScore = 100;
    const compute20Score = computeScoreFromExpectedTime(baseScore, 20, FALLBACK_DECAY_RULE);
    expect(Math.round(compute20Score)).toBe(62);
    const compute28Score = computeScoreFromExpectedTime(baseScore, 28, FALLBACK_DECAY_RULE);
    expect(Math.round(compute28Score)).toBe(58);
    const compute31Score = computeScoreFromExpectedTime(baseScore, 31, FALLBACK_DECAY_RULE);
    expect(Math.round(compute31Score)).toBe(56);
    const compute366Score = computeScoreFromExpectedTime(baseScore, 366, FALLBACK_DECAY_RULE);
    expect(Math.round(compute366Score)).toBe(0);
    const computeBadScore = computeScoreFromExpectedTime(baseScore, -5, FALLBACK_DECAY_RULE);
    expect(Math.round(computeBadScore)).toBe(100);
  });

  it('should compute score and time', () => {
    const baseScore = 100;
    const compute20Score = computeScoreFromExpectedTime(baseScore, 20, FALLBACK_DECAY_RULE);
    expect(Math.round(computeTimeFromExpectedScore(baseScore, compute20Score, FALLBACK_DECAY_RULE))).toBe(20);
  });

  it('should find the right rule for indicator type', () => {
    // GIVEN the type is unknown or not filled, WHEN getting decay rule, THEN the FALLBACK one is return.
    let decayRule: DecayRule = findDecayRuleForIndicator('');
    expect(decayRule.id).toBe('FALLBACK_DECAY_RULE');

    // GIVEN the type is IP, WHEN getting decay rule, THEN the IP one is return.
    decayRule = findDecayRuleForIndicator('IPv6-Addr');
    expect(decayRule.id).toBe('IP_DECAY_RULE');

    // GIVEN the type is URL, WHEN getting decay rule, THEN the URL one is return.
    decayRule = findDecayRuleForIndicator('Url');
    expect(decayRule.id).toBe('URL_DECAY_RULE');
  });

  it('should find the next reaction date', () => {
    const startDate = moment('2023-01-01');

    // GIVEN a decay based on fallback, WHEN stable score is the last reaction point
    let nextReactionDate = computeNextScoreReactionDate(100, 20, FALLBACK_DECAY_RULE, startDate);
    // THEN the next reaction date should be the revoke day, 1 year after the start date.
    expect((moment(nextReactionDate)).format('YYYY-MM-DD'), 'Next reaction date should be the revoke date.').toBe('2024-01-01');

    // GIVEN a decay based on fallback, WHEN stable score is the first stable score
    nextReactionDate = computeNextScoreReactionDate(100, 100, FALLBACK_DECAY_RULE, startDate);
    // THEN the next reaction date should be the one for score 80
    const expected80ScoreDays = computeTimeFromExpectedScore(100, 80, FALLBACK_DECAY_RULE);
    expect((moment(nextReactionDate)).format('YYYY-MM-DD'), 'Next reaction date should be the score 80 date.').toBe((moment(startDate).add(expected80ScoreDays, 'days')).format('YYYY-MM-DD'));
  });
});
