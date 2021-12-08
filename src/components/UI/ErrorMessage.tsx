import React from "react";

interface Props {
	message: string | null;
}

const ErrorMessage = (props: Props) => {
	return <div className=' my-5 text-red-700'>{props.message}</div>;
};

export default ErrorMessage;
