import React, { useContext, useState } from 'react'
import { StyleSheet, Button} from 'react-native'
import { View } from "../../components/themed/View";
import { Text } from "../../components/themed/Text";
import { ScreenContext } from '../../contexts/ScreenContext';
import { useLocale } from '../../hooks/useLocale';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontSize } from '../../constants/FontSize';
import validator from 'validator';
import { useLocalErrorMessage } from '../../hooks/useLocalErrorMessage';
import { checkEmailService } from '../../services/checkEmailService';
import InputWithLabel from '../../components/customComponent/InputWithLabel';
import IconButton from '../../components/customComponent/IconButton';
import StagesLayout from '../../components/layouts/StagesLayout';
import { signInService } from '../../services/signInService';
import { saveAccessTokenService } from '../../services/storageServices/saveAccessTokenService';
import { saveRefreshTokenService } from '../../services/storageServices/saveRefreshTokenService';

export default function SignInScreen({navigation}:{navigation:StackNavigationProp<AuthNavigationParamList,"SignInScreen">}) {

    const screenContext = useContext(ScreenContext);

    const styles = StyleSheet.create({
        container: {
            paddingTop: 35,
            alignItems: "center",
        },

        titleText: {
            fontSize: FontSize.Large
        },


        center: {
            width: '100%',
            alignItems: "center",
            justifyContent: "center"
        },
        flex1: {
            flex: 1
        },
        rowFlex: {
            flexDirection: "row"
        },
        spaceBetween: {
            justifyContent: "space-between"
        },
        fullWidth: {
            width: '100%'
        }
    })


    const [email, setEmail] = useState<string>("");
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [passward, setPassward] = useState<string>("");
    const [passwardErrorMessage, setPasswardErrorMessage] = useState<string>("");

    const checkEmail = async (): Promise<boolean> => {
        let result: boolean = true;
        if (validator.isEmail(email) == false) {
            setEmailErrorMessage(useLocalErrorMessage({}, "invalidEmail"));
            result = false;
        }
        else
            setEmailErrorMessage("");

        if (result == false)
            return false;

        let response = await checkEmailService(email);

        // if(response.success == false)
        // {
        //     response.errors
        // }

        if (response.data.exists == false) {
            setEmailErrorMessage(useLocalErrorMessage({}, "emailDoesntExist"));
            return false;
        }

        return result;
    }
    const signIn = async (): Promise<boolean> => {
        
        let result: boolean = true;

        let response = await signInService(
            email,
            passward
        )

        if(response.success == true)
        {
            await saveAccessTokenService(response.data.accessToken);
            await saveRefreshTokenService(response.data.refreshToken);
        
            return true
        }

        return false;
    }


    const onSuccess = () => {
        if(screenContext.setCurrentScreen!=undefined)
        {   
            screenContext.setCurrentScreen("Main");
        }
    }

    const Stages: Stage[] = [
        {
            Component: (nextHundler, backHundler, finishHundler) =>
                (<View style={[
                    styles.flex1,
                    styles.center
                ]}>
                    <View style={styles.center}>
                        <InputWithLabel
                            errorMessage={emailErrorMessage}
                            label={useLocale({}, "emailLabel")}
                            setValue={(value: string) => setEmail(value)}
                            value={email}
                            placeholder={useLocale({}, "emailLabel")}
                        />
                    </View>
                    <View>
                        <IconButton locked name={useLocale({},"direction")=="rtl"?"arrow-left":"arrow-right"} onClick={nextHundler} />
                    </View>

                </View>),
            Verifyier: checkEmail,
            Submit: async () => true
        },
        {
            Component: (nextHundler, backHundler, finishHundler) =>
                (<View style={[
                    styles.flex1,
                    styles.center
                ]}>
                    <View style={styles.center}>
                        <InputWithLabel
                            errorMessage={passwardErrorMessage}
                            label={useLocale({}, "passwardLabel")}
                            setValue={(value: string) => setPassward(value)}
                            value={passward}
                            secureTextEntry
                            placeholder={useLocale({}, "passwardLabel")}
                        />                       
                    </View>
                    <View style={[
                        styles.rowFlex,
                        styles.spaceBetween,
                    ]}>
                        <IconButton locked name={useLocale({},"direction")=="rtl"?"arrow-right":"arrow-left"} onClick={backHundler} />
                        <IconButton locked willDie name="check" onClick={finishHundler} />
                    </View>

                </View>
                ),
            Verifyier: async () => true,
            Submit: signIn
        }
    ]
    return (
        <View style={[
            styles.container,
            styles.flex1
        ]}>
            <View >
                <Text style={styles.titleText}>{useLocale({}, "signingInHeader")}</Text>
            </View>

            <StagesLayout Stages={Stages} onFinish={onSuccess} />

        </View>
    )
}

