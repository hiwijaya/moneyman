import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableOpacity, 
    FlatList,
} from 'react-native';
import { Styles } from './lib/styles';
import Env from './lib/env';


export default class Categories extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabSelectedIndex: 0,
            eCategories: [],
            iCategories: []
        };

    }

    componentDidMount() {
        let eCategories = Env.getCategories(null, Env.EXPENSE_TYPE);
        let iCategories = Env.getCategories(null, Env.INCOME_TYPE);
        this.setState({
            eCategories: eCategories,
            iCategories: iCategories
        });
    }

    

    renderTab() {
        return(
            <View>
                <View style={[Styles.actionbarBox, {elevation: 0}]}>
                    <TouchableOpacity style={Styles.backButton} 
                        onPress={() => { this.props.navigation.goBack(); }}>
                        <Image style={Styles.icon18} source={require('./asset/icon-back.png')}/>
                    </TouchableOpacity>
                    <Text style={Styles.actionbarTitle}>Categories</Text>
                </View>
                <View style={Styles.tabBox}>
                    <TouchableOpacity 
                        style={[Styles.center, (this.state.tabSelectedIndex === 0) ? Styles.tabSelected : null]} 
                        onPress={() => this.setState({tabSelectedIndex: 0})}>
                        <Text>Expenses</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[Styles.center, (this.state.tabSelectedIndex === 1) ? Styles.tabSelected : null]}
                        onPress={() => this.setState({tabSelectedIndex: 1})}>
                        <Text>Income</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // TODO: Consider to try react-native-swipeout.


    renderCategories(categories) {
        return(
            <FlatList 
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return(
                        <View style={Styles.listItemBox}>
                            <View style={Styles.listIconBox}>
                                <Image style={Styles.icon18} source={item.icon}/>
                            </View>
                            <Text style={{flex: 1}}>{item.title}</Text>
                            <TouchableOpacity style={Styles.listDeleteBox}>
                                <Image style={Styles.icon18} source={require('./asset/icon-delete.png')}/>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        );
    }

    render() {
        return (
            <View style={Styles.sceneBox}>
                {this.renderTab()}
                {
                    (this.state.tabSelectedIndex == 0) ?
                     this.renderCategories(this.state.eCategories) : this.renderCategories(this.state.iCategories)
                }
            </View>
        );
    }
}
