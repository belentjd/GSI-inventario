// Estas URL se incorporan al JavaScript público. También pueden sustituirse con
// PUBLIC_PERSONAS_CSV_URL y PUBLIC_OBJETOS_CSV_URL durante el build.
const publishedSheet = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQA4AAm8uU6vwl7s93I89pmOKLwhipUmeoJ5d5OiCzivgkinDN3uZLxzWyOay9MW0tDQakjUdzVdDiR/pub';

export const csvUrls = {
  people: import.meta.env.PUBLIC_PERSONAS_CSV_URL ||
    `${publishedSheet}?gid=1733203923&single=true&output=csv`,
  objects: import.meta.env.PUBLIC_OBJETOS_CSV_URL ||
    `${publishedSheet}?gid=0&single=true&output=csv`,
};
