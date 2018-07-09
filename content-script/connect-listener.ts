export class ConnectListener {
  constructor() {
    this.initializeMessagesListener();
  }

  initializeMessagesListener() {
    chrome.runtime.onConnect.addListener(this.onConnectHandler.bind(this));
  }

  onConnectHandler(port: chrome.runtime.Port) {
    port.onMessage.addListener(this.onConnectMessageHandler.bind(this));
  }

  onConnectMessageHandler(msg, port) {
    console.log('Recieved connection message: ' + msg);
    const response = 'Greetings';
    port.portMessage(response);
  }
}
