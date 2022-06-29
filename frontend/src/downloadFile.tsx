interface Props {
  fileName: string;
  contents: string;
}

const downloadFile = ({ fileName, contents }: Props) => {
  const file = new File([contents], fileName);
  const blob = URL.createObjectURL(file);

  const link = document.createElement(`a`);
  link.href = blob;
  link.download = fileName;

  document.body.append(link);
  link.click();
  link.remove();
};

export default downloadFile;
