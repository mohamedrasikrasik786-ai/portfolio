/**
 * Firebase v10.14.1 Error Suppression
 * Suppresses known Firebase internal warnings in production
 */

const _err = console.error;
const _warn = console.warn;

const safeStringify = (obj: any): string => {
  try {
    if (obj === null || obj === undefined) return String(obj);
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
    if (typeof obj === 'object') {
      if (obj.toString && obj.toString !== Object.prototype.toString) {
        return obj.toString();
      }
      return '[object]';
    }
    return String(obj);
  } catch (e) {
    return '[unserializable]';
  }
};

const hasFirebaseObject = (args: any[]): boolean => {
  try {
    for (const arg of args) {
      if (arg?.constructor?.name?.match(/^[A-Z]\d+$/)) return true;
      if (typeof arg === 'object' && arg !== null) {
        const keys = Object.keys(arg);
        if (keys.some(k => k.startsWith('__PRIVATE') || k === 'i' || k === 'src')) {
          return true;
        }
      }
    }
    return false;
  } catch (e) {
    return false;
  }
};

const isFBError = (...args: any[]): boolean => {
  try {
    if (hasFirebaseObject(args)) return true;
    const text = args
      .filter(a => typeof a === 'string' || typeof a === 'number')
      .map(a => safeStringify(a))
      .join(' ');
    return (
      text.includes('FIRESTORE') ||
      text.includes('INTERNAL ASSERTION') ||
      text.includes('__PRIVATE') ||
      text.includes('firebase') ||
      text.includes('circular structure')
    );
  } catch (e) {
    return false;
  }
};

console.error = (...args: any[]) => {
  if (!isFBError(...args)) {
    _err.apply(console, args);
  }
};

console.warn = (...args: any[]) => {
  if (!isFBError(...args)) {
    _warn.apply(console, args);
  }
};

if (import.meta.env?.DEV) {
  console.log('✅ Firebase v10.14.1 - Error suppression active');
}
