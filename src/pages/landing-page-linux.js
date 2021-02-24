document
  .getElementById('auth-ticket-input')
  .addEventListener('input', (event) => {
    const token = event.target.value;
    console.log(token);

    const numberOfFullStops = (token.match(/\./g) ?? []).length;

    console.log(numberOfFullStops);

    if (numberOfFullStops !== 2) {
      return;
    }

    window.peakrpBrowser.connect(token);
  });
