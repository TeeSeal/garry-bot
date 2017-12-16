module.exports = {
    originalRequest:
    {
        source: 'facebook',
        data:
        {
            sender: [Object],
            recipient: [Object],
            message: [Object],
            timestamp: 1513434731762,
        },
    },
    id: '095a02e7-15bd-4cef-9074-57783126acd0',
    timestamp: '2017-12-16T14:32:12.771Z',
    lang: 'en',
    result:
    {
        source: 'agent',
        resolvedQuery: 'I have 300 dollars',
        speech: '',
        action: '',
        actionIncomplete: false,
        parameters: { balance: '300 dollars' },
        contexts: [[Object]],
        metadata:
        {
            intentId: 'e501c237-fa17-4048-a03a-3cf9c21cf840',
            webhookUsed: 'true',
            webhookForSlotFillingUsed: 'false',
            intentName: 'Balance',
        },
        fulfillment:
        {
            speech: 'Okay, I\'ve set your balance to 300 dollars',
            messages: [Array],
        },
        score: 0.699999988079071,
    },
    status: { code: 200, errorType: 'success', webhookTimedOut: false },
    sessionId: 'db6d3b40-234b-4b3c-9a79-4c530d857fcc',
};
