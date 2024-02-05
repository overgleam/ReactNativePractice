import { SafeAreaView, View, Text, TextInput, Image } from "react-native";
export default function Signup() {
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View>
                <Image style={{ height: 100, width: 100 }} source={require('../assets/images/burger.svg')} />
                <Text>Create Account</Text>
            </View>
            <View>
                <Text>Username</Text>
                <View>
                    <TextInput placeholder="Enter username" placeholderTextColor={'#3c77b2'}></TextInput>
                </View>
            </View>
        </SafeAreaView>
    );
}