type FormErrorIndicatorProps = {
	isPending: boolean;
	errorInfo: string;
};

const FormErrorIndicator = ({
	isPending,
	errorInfo,
}: FormErrorIndicatorProps) => {
	return (
		<>
			{!isPending && errorInfo && (
				<div className="mx-auto mt-1 text-sm text-center w-fit">
					{errorInfo}
				</div>
			)}
		</>
	);
};

export default FormErrorIndicator;
