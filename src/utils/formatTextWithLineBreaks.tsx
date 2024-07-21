export const formatTextWithLineBreaks = (text: string) => {
  return text.split('\n').map((line) => (
    <>
      {line}
      <br />
    </>
  ));
};