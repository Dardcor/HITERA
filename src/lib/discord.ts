export async function sendDiscordWebhook(webhookUrl: string | undefined, content: any) {
  if (!webhookUrl) {
    console.warn('Discord webhook URL is not provided.');
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      console.error('Failed to send to Discord:', await response.text());
    }
  } catch (error) {
    console.error('Error sending to Discord:', error);
  }
}
