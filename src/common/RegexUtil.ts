type CharsType = {
  [key: string]: string;
  "&amp;": string;
  "&lt;": string;
  "&gt;": string;
  "&quot;": string;
  "&#39;": string;
};

const regex = /&(amp|lt|gt|quot|#39);/g;

const chars: CharsType = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
};

export const regexReplace = (str: string) => {
  if (regex.test(str)) {
    return str.replaceAll(regex, (matched) => chars[matched] || matched);
  } else {
    return str;
  }
};
