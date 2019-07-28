import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity 
} from 'react-native';
import {Styles, Colors} from './lib/styles';
import Env from './lib/env';


export default class AddCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderActionBar() {
        return(
            <View style={Styles.actionbarBox}>
                <TouchableOpacity style={Styles.backButton} 
                    onPress={() => { this.props.navigation.goBack(); }}>
                    <Image style={Styles.icon18} source={require('./asset/icon-back.png')}/>
                </TouchableOpacity>
                <Text style={Styles.actionbarTitle}>Add Expense Category</Text>
                <TouchableOpacity style={Styles.backButton} 
                    onPress={() => { this.props.navigation.goBack(); }}>
                    <Image style={Styles.icon18} source={require('./asset/icon-checked.png')}/>
                </TouchableOpacity>
            </View>
        );
    }

    renderInputTitle() {
        return(
            <View style={Styles.addTitleBox} >
                <View style={[Styles.iconBox, {marginRight: 15}]}>
                    <Image style={Styles.icon18} 
                    source={require('./asset/categories/cat-food-burger.png')}/>
                </View>
                <TextInput 
                    style={Styles.addTitleInput} 
                    autoCorrect={false}
                    underlineColorAndroid={Colors.primary}
                    placeholder={'Category Title'}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={Styles.sceneBox}>
                {this.renderActionBar()}
                {this.renderInputTitle()}
                <ScrollView>
                    {
                        Env.EXPENSE_ASSETS.map((item, key) => {
                            return(
                                <View key={key}>
                                    <View style={Styles.addCategoryGroup}>
                                        <Text>{item.category}</Text>
                                    </View>
                                    <View style={Styles.addIconListBox}>
                                        {
                                            item.icons.map((item2, key2) => {
                                                return(
                                                    <View key={key2} style={[Styles.addIconBox]}>
                                                        <Image style={Styles.icon18} 
                                                            source={item2.icon}/>
                                                    </View>
                                                );
                                            })
                                        }
                                    </View>
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}
