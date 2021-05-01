import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
    containerStyle?: {},
}

interface InputValueReference {
    value: string;
}

// Gambiarra maluca para permitir que o elemento pai acesse o elemento filho
// Foi feita a maior confusão só para mudar de um input para o outro com o 'next' do teclado
// Totalmente desnecessário
interface InputRef {
    focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
    { name, icon, containerStyle = {}, ...rest },
    ref
) => {
    // Criadno a referência visual para o elemento
    const inputElementRef = useRef<any>(null);

    // Pegando os dados para registrar o input
    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

    // Criando os estados para os inputs que estão focados (clicados), preenchidos ou com erro
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [isErrored, setIsErrored] = useState(false);

    // Criando os callbacks para as funções
    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);
    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        // Verificando se está preenchido e mudando o estado
        setIsFilled(!!inputValueRef.current.value);
    }, []);

    // Acessando uma informação que está no componente filho pelo elemento pai
    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus();
        }
    }));

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            // Atribuindo um valor
            setValue(ref: any, value) {
                // Mudando o valor da referêcia
                inputValueRef.current.value = value;
                // Mudando visualmente o texto do input
                inputElementRef.current.setNativeProps({ text: value });
            },
            // Limpando o valor
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }
        })
    }, [fieldName, registerField]);

    return (
        <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
            {/* Ajustando a cor se o campo estiver focado ou preenchido */}
            <Icon
                name={icon}
                size={20}
                color={isFocused || isFilled ? '#ff9000' : '#666360'}
            />

            <TextInput
                ref={inputElementRef}
                keyboardAppearance="dark" // Funciona somente no iOS
                placeholderTextColor="#666360"
                defaultValue={defaultValue}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={(value) => {
                    inputValueRef.current.value = value;
                }}
                {...rest}
            />
        </Container>
    )
};

export default forwardRef(Input);
