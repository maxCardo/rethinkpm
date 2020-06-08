
export const showNotification = (title, body) => {
  const options = {
    body,
      // here you can add more properties like icon, image, vibrate, etc.
  };
  window.serviceWorker.showNotification(title, options)
}