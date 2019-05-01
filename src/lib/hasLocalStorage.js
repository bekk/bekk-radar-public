const detectLocalStorage = () => {
  const uid = new Date;
  try {
    localStorage.setItem(uid, uid);
    const result = localStorage.getItem(uid) == uid;
    localStorage.removeItem(uid);
    return result && localStorage;
  } catch (exception) {}
};

const hasLocalStorage = detectLocalStorage();

export default hasLocalStorage;
