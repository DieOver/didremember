export const Utils = {
  replaceUrl: (url: string, data: object = undefined) => {
    if (!data) return url;
    const regex = new RegExp(':(' + Object.keys(data).join('|') + ')', 'g');
    return url.replace(regex, (m, $1) => data[$1] || m);
  },
};
