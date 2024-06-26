import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html,
body,
div,
span,
h1,
h2,
h3,
h4,
h5,
h6,
p,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

body {
  margin: 0;
  font-size: 15px;
  background-color: ${({
    theme: {
      colors: { backgroundDarkBlue },
    },
  }) => backgroundDarkBlue};

  color: ${({
    theme: {
      colors: { white },
    },
  }) => white};

  height: 99vh;
  overflow: hidden;
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;

export default GlobalStyle;
