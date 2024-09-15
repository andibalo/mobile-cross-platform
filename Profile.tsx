import { View, Text } from "react-native";

interface IProfile {
    name: string
    age: number
}

const Profile = ({ name, age }: IProfile) => {
  return (
    <View>
      <Text>Halo nama ku, {name != "" ? `${name}!`: ""} </Text>
      <Text>Umur ku, {age} tahun</Text>
    </View>
  );
};

export default Profile;