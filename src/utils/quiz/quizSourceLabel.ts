import { ContentSourceType } from '../../types/types';

export const quizSourceLabel = (sourceType: ContentSourceType) => {
  switch (sourceType) {
    case ContentSourceType.MANUAL:
      return 'Manuel';

    case ContentSourceType.IMPORT_FILE:
      return 'Import';

    default:
      return 'Inconnu';
  }
};
