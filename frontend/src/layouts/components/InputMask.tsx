import React, { forwardRef } from "react";
import MaskedInput from "react-text-mask";

// Criando um componente de input mascarado que usa forwardRef
const InputMask = forwardRef<HTMLInputElement, any>((props, ref) => {
    const { inputRef, ...other } = props;
    return (
        <MaskedInput
            {...other}
            ref={(refInstance) => {
                if (typeof inputRef === 'function') {
                    inputRef(refInstance ? refInstance.inputElement : null);
                } else if (inputRef) {
                    inputRef.current = refInstance ? refInstance.inputElement : null;
                }
            }}
        />
    );
});

InputMask.displayName = "InputMask";

export default InputMask;
