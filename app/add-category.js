import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    Alert,
    TextInput,
    ScrollView,
    ToastAndroid,
    TouchableOpacity 
} from 'react-native';
import Cicon from './comp/cicon';
import {Styles, Colors, Screen} from './lib/styles';
import Env from './lib/env';


export default class AddCategory extends Component {

    constructor(props) {
        super(props);

        this.transactionType = this.props.navigation.getParam('transactionType');
        this.categoryAssets = (this.transactionType === Env.EXPENSE_TYPE) ? Env.EXPENSE_ASSETS : Env.INCOME_ASSETS;

        this.state = {
            transactionType: this.transactionType,
            title: '',
            icon: require('./asset/categories/cat-food-apple.png'),
            color: '#FF7675',
            iKey: '00'  // iconKey()
        };

         
    }

    saveCategory() {
        let title = this.state.title;

        if (title === null || title === '') {
            ToastAndroid.show('Please input the category title', ToastAndroid.SHORT);
            return;
        }

        let newCategory = {
            id: Env.getRandomString(16),
            title: title,
            icon: this.state.icon,
            color: this.state.color,
            type: this.transactionType
        }
        Env.addCategory(newCategory);

        Env.writeStorage(Env.key.BACKUP_SYNC, 'N');

        ToastAndroid.show('Category added', ToastAndroid.SHORT);
        this.props.navigation.state.params.onNavigateBack(null);
        this.props.navigation.goBack();
    }

    iconKey(key, key2){
        return key.toString() + key2.toString();
    }

    renderActionBar() {
        return(
            <View style={Styles.actionbarBox}>
                <TouchableOpacity style={Styles.backButton} 
                    onPress={() => { this.props.navigation.goBack(); }}>
                    <Image style={Styles.icon18} source={require('./asset/icon-back.png')}/>
                </TouchableOpacity>
                <Text style={Styles.actionbarTitle}>
                    {this.state.transactionType === Env.EXPENSE_TYPE ? 'Add Expense Category' : 'Add Income Category'}
                </Text>
                <TouchableOpacity style={Styles.backButton} 
                    onPress={() => this.saveCategory() }>
                    <Image style={Styles.icon18} source={require('./asset/icon-checked.png')}/>
                </TouchableOpacity>
            </View>
        );
    }

    renderInputTitle() {
        return(
            <View style={Styles.addTitleBox} >
                <Cicon style={{marginRight: 15}} 
                    icon={this.state.icon} color={this.state.color}/>
                <TextInput 
                    style={Styles.addTitleInput} 
                    autoCorrect={false}
                    underlineColorAndroid={Colors.primary}
                    placeholder={'Category Title'}
                    onChangeText={(text) => this.setState({title: text})}
                    value={this.state.title}
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
                        this.categoryAssets.map((item, key) => {
                            return(
                                <View key={key}>
                                    <View style={Styles.addCategoryGroup}>
                                        <Text>{item.category}</Text>
                                    </View>
                                    <View style={Styles.addIconListBox}>
                                        {
                                            item.icons.map((item2, key2) => {
                                                let k = this.iconKey(key, key2);
                                                return(
                                                    <View key={k} 
                                                        style={Styles.addIconBox}>
                                                        <TouchableOpacity 
                                                            onPress={() => { 
                                                                this.setState({
                                                                    iKey: k,
                                                                    icon: item2.icon,
                                                                    color: item2.color
                                                                }); 
                                                            }}>
                                                            <Cicon id={k} sid={this.state.iKey}
                                                                icon={item2.icon} 
                                                                color={(this.state.iKey === k) ? item2.color : Colors.lightGrey}/>
                                                        </TouchableOpacity>
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
