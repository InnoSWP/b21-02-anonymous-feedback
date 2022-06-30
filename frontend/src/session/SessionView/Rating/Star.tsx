interface Props {
  /** A value in the range [0, 1] */
  filled: number;
  id: string;
}

const Star = ({ filled, id }: Props) => {
  const percentage = `${filled * 100}%`;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id}>
          <stop offset={percentage} stopColor="#F3AF2A" />
          <stop offset={percentage} stopColor="rgb(0 0 0 / 0.2)" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M6.99292 20.8C6.80958 20.95 6.61392 20.9583 6.40592 20.825C6.19725 20.6917 6.13458 20.5083 6.21792 20.275L8.09292 14.15L3.21792 10.65C3.01792 10.5167 2.95558 10.3333 3.03092 10.1C3.10558 9.86667 3.25958 9.75 3.49292 9.75H9.54292L11.4679 3.35C11.5013 3.21667 11.5639 3.125 11.6559 3.075C11.7473 3.025 11.8429 3 11.9429 3C12.0429 3 12.1389 3.025 12.2309 3.075C12.3223 3.125 12.3846 3.21667 12.4179 3.35L14.3429 9.75H20.3929C20.6263 9.75 20.7806 9.86667 20.8559 10.1C20.9306 10.3333 20.8679 10.5167 20.6679 10.65L15.7929 14.15L17.6679 20.275C17.7513 20.5083 17.6889 20.6917 17.4809 20.825C17.2723 20.9583 17.0763 20.95 16.8929 20.8L11.9429 17.05L6.99292 20.8Z"
      />
    </svg>
  );
};

export default Star;
