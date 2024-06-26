type TLanguage = {
  code: string;
  name: string;
  native: string;
  rtl: boolean;
};

type TSubdivision = {
  code: string;
  emoji: string;
  name: string;
};

type TState = {
  code: string;
};

type TContinent = {
  code: string;
  countries: {
    code: string;
  }[];
  name: string;
};

export type TCountry = {
  awsRegion: string;
  capital: string;
  code: string;
  continent: TContinent;
  currencies: string[];
  currency: string;
  emoji: string;
  emojiU: string;
  languages: TLanguage[];
  name: string;
  native: string;
  phone: string;
  phones: string[];
  states: TState[];
  subdivisions: TSubdivision[];
};

export type TOption = {
  key: string;
  name: string;
  value: string;
};
