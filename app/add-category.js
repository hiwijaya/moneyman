import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TextInput,
    TouchableOpacity 
} from 'react-native';
import {Styles, Colors} from './lib/styles';


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
            <View style={Styles.categoryTitleBox} >
                <View style={[Styles.listIconBox, {marginRight: 15}]}>
                    <Image style={Styles.icon18} 
                    source={require('./asset/categories/cat-food-burger.png')}/>
                </View>
                <TextInput 
                    style={Styles.titleInput} 
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
            </View>
        );
    }
}
