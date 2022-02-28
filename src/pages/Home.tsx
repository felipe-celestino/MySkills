import React, { useState, useEffect } from "react";
import { View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Platform,
	FlatList,
} from 'react-native'

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData {
    id: string;
    name: string;
}

export function Home() {
	const [newSkill, setNewSkill] = useState('');
	const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [gretting, setGretting] = useState('');

	function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill,
        }
		setMySkills(oldState => [... oldState, data]);
	}

    function handleAddRemoveSkill(id: string) {
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id 
        ));
    }

    useEffect(() => {
        const currentHour = new Date().getHours();
        if(currentHour < 12){
            setGretting('Bom dia');
        }else if (currentHour >= 12 && currentHour < 18){
            setGretting('Boa tarde');
        }else {
            setGretting('Boa noite');
        }
    }, [])

  	return (
    	<View style={styles.container}>
      	    <Text style={styles.title}>
				Bem vindo, Felipe
			</Text>

            <Text style={styles.greetings}>
                {gretting}
            </Text>

      		<TextInput 
				style={styles.input}
				placeholder="New skill"
				placeholderTextColor="#555"
				onChangeText={setNewSkill}
			/>
			<Button
                title="Add" 
                onPress={handleAddNewSkill}
            />

			<Text style={[styles.title, {marginVertical: 50}]}>
				MySkills
			</Text>
            
			<FlatList 
			  	data={mySkills}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
                    <SkillCard 
                        skill={item.name}
                        onPress={() => handleAddRemoveSkill(item.id)}
                    />
				)}
			/>
   		</View>
  	)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        color:'#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    greetings: {
        color: '#fff',
    },
    input: {
        backgroundColor: '#1F1e25',
        color:'#fff',
        fontSize: 18,
        padding: Platform.OS == 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 5,
    },
})