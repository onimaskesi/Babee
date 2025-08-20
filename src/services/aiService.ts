import { OnboardingData } from '../store/onboardingStore';
const GEMINI_API_KEY = 'AIzaSyAkgnqyC-SkMDXLVtnyiQQzDCKmP4Q9oAY';

export async function askMe(question: string) {
  const API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'X-goog-api-key': GEMINI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: question,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Together AI API error: ${response.statusText}`);
    }

    const result = await response.json();

    const answer = result.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log('answer', answer);

    return answer;
  } catch (error) {
    console.error('Error', error);

    return 'error';
  }
}

export async function fetchPersonalizedAdvice(
  data: OnboardingData,
  t: (key: string, options?: any) => string,
): Promise<string> {
  const promptParts = [];

  if (data.babyName)
    promptParts.push(t('aiService.babyNameLabel') + data.babyName);
  if (data.birthDate)
    promptParts.push(
      t('aiService.birthDateLabel') +
        data.birthDate.toISOString().split('T')[0],
    );
  if (data.gender) promptParts.push(t('aiService.genderLabel') + data.gender);
  if (data.gestationalAgeAtBirth !== undefined)
    promptParts.push(
      t('aiService.gestationalAgeLabel') +
        data.gestationalAgeAtBirth +
        t('aiService.weeksLabel'),
    );
  if (data.sleepIssues !== undefined)
    promptParts.push(t('aiService.sleepIssuesLabel') + data.sleepIssues);
  if (data.feedingType)
    promptParts.push(t('aiService.feedingTypeLabel') + data.feedingType);
  if (data.milkSupplyConcern !== undefined)
    promptParts.push(
      t('aiService.milkSupplyConcernLabel') + data.milkSupplyConcern,
    );
  if (data.breastfeedingPain !== undefined)
    promptParts.push(
      t('aiService.breastfeedingPainLabel') + data.breastfeedingPain,
    );
  if (data.moodIssues !== undefined)
    promptParts.push(t('aiService.moodIssuesLabel') + data.moodIssues);
  if (data.healthNotes)
    promptParts.push(t('aiService.healthNotesLabel') + data.healthNotes);

  const userMessage = t('aiService.userMessageTemplate', {
    promptIntro: t('aiService.promptIntro'),
    data: promptParts.join('\n'),
    promptFooter: t('aiService.promptFooter'),
  });

  console.log('userMessage', userMessage);

  const API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'X-goog-api-key': GEMINI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: userMessage,
              },
            ],
          },
        ],
      }),
    });

    console.log('response', JSON.stringify(response));

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();

    let advice =
      result.candidates?.[0]?.content?.parts?.[0]?.text ||
      t('aiService.noAdvice');

    console.log('advice', advice);

    return advice || t('aiService.noAdvice');
  } catch (error) {
    console.error('Error fetching personalized advice:', error);

    let advice = t('aiService.fallback');

    if (data.breastfeedingPain && data.breastfeedingPain >= 4) {
      advice += t('aiService.breastfeedingPain');
    }
    if (data.milkSupplyConcern && data.milkSupplyConcern >= 4) {
      advice += t('aiService.milkSupplyConcern');
    }
    if (data.sleepIssues && data.sleepIssues >= 4) {
      advice += t('aiService.sleepIssues');
    }
    if (data.gestationalAgeAtBirth && data.gestationalAgeAtBirth < 37) {
      advice += t('aiService.premature');
    }
    if (data.moodIssues && data.moodIssues >= 4) {
      advice += t('aiService.moodIssues');
    }
    if (data.healthNotes && data.healthNotes.length > 0) {
      advice += t('aiService.additionalNotes', { notes: data.healthNotes });
    }

    return advice;
  }
}
