// components/CustomHeader.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  title: string;
  showBack?: boolean;
  rightIcon?: React.ReactNode;
}

export default function CustomHeader(
    { title,
    showBack = false,
    rightIcon
    }: Props) {
  const router = useRouter();

  return (
    <SafeAreaView >
      <View className='flex-row items-center justify-between gap-5 p-4' >
        {showBack && (
            <View className='flex-row items-center justify-start gap-5'>
            <TouchableOpacity onPress={() => router.back()} >
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className='text-white text-lg font-semibold'>{title}</Text>
            </View>
        )}
        <View>
            {rightIcon}
        </View>
      </View>
    </SafeAreaView>
  );
}
