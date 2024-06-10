import detect from "detect.js";
import ReactGA4 from "react-ga4";

export const initGa = () => {
  ReactGA4.initialize("G-EDK7GXR1TY");

  console.log("GA INITIALIZED");
};

const getUserDevice = () => {
  const ua = navigator.userAgent.toLocaleLowerCase();

  if (
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
      ua
    )
  ) {
    return "tablet";
  }

  if (
    /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(
      ua
    )
  ) {
    return "mobile";
  }

  return "desktop";
};

const getBrowserName = () => {
  const ua = detect.parse(navigator.userAgent);
  return ua.browser.family;
};

export const sendGaEvent = (eventName, data) => {
  const eventData = {
    ...data,
    timestamp: new Date(),
    browser: getBrowserName(),
    device: getUserDevice(),
  };

  ReactGA4.event(eventName, eventData);
};
