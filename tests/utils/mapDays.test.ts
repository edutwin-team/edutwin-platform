import { dayToFrench, orderedDays } from '../../src/utils/dashboard/mapDays';

describe('mapDays', () => {
  it('contient les 7 jours de la semaine dans l’ordre', () => {
    expect(orderedDays).toHaveLength(7);
    expect(orderedDays[0]).toBe('Monday');
    expect(orderedDays[6]).toBe('Sunday');
  });

  it('traduit chaque jour en français', () => {
    expect(dayToFrench.Monday).toBe('Lundi');
    expect(dayToFrench.Tuesday).toBe('Mardi');
    expect(dayToFrench.Wednesday).toBe('Mercredi');
    expect(dayToFrench.Thursday).toBe('Jeudi');
    expect(dayToFrench.Friday).toBe('Vendredi');
    expect(dayToFrench.Saturday).toBe('Samedi');
    expect(dayToFrench.Sunday).toBe('Dimanche');
  });
});
