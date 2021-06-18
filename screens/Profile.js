import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Text, View, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShare";
import AuthButton from "../components/auth/AuthButton";
import { gql, useMutation } from "@apollo/client";
import { isLoggedInVar, logUserIn } from "../apollo";


const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login({ navigation }) {
    const { register, handleSubmit, setValue, watch } = useForm();
    const passwordRef = useRef();
    const onCompleted = async (data) => {
        const { login: { ok, token } }
            = data;
        if (ok) {
            console.log(token)
            await logUserIn(token);
        } else {
            alert("username / password not correct")
        }
    }
    const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted,
    });

    const onValid = (data) => {
        console.log(data)
        if (!loading) {
            logInMutation({
                variables: {
                    ...data,
                },
            });
        }
    };
    useEffect(() => {
        register("username", { required: true, });
        register("password", { required: true, });


    }, [register]);

    const onNext = (next) => {
        next?.current?.focus();
    }
    return (

        <AuthLayout>

            <TextInput
                autoFocus
                placeholder="Username"
                placeholderTextcolor="gray"
                returnKeyType="next"
                onChangeText={(text) => setValue("username", text)}

                onSubmitEditing={() => onNext(passwordRef)}
            />
            <TextInput
                ref={passwordRef}
                placeholder="password"
                placeholderTextcolor="gray"
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(text) => setValue("password", text)}

            />

            <AuthButton
                text="Log In"
                disabled={!watch("username") || !watch("password")}
                onPress={handleSubmit(onValid)} />



        </AuthLayout>
    );
}