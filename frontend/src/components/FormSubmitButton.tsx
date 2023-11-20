type FormSubmitButtonProps = {
	text: string;
	isPending: boolean;
};

const FormSubmitButton = ({ text, isPending }: FormSubmitButtonProps) => {
	return (
		<button
			type="submit"
			className="uppercase bg-color1 px-11 py-3 font-[Arial] text-white w-fit mx-auto text-xs rounded-[20px] mt-3 font-bold tracking-wider min-w-[135px] min-h-[40px] transition-all duration-300"
		>
			{isPending ? (
				<div className="w-4 h-4 mx-auto border-[4px] rounded-full border-slate-50 border-t-blue-500 animate-spin"></div>
			) : (
				text
			)}
		</button>
	);
};

export default FormSubmitButton;
