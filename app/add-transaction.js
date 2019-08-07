import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableOpacity,
    ScrollView, 
} from 'react-native';
import Cicon from './comp/cicon';
import { Styles, Colors, Fonts } from './lib/styles';
import Env from './lib/env';


export default class AddTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactionType: Env.EXPENSE_TYPE,
            eCategories: [],
            iCategories: [],
            iKey: null,     // iconKey

            icon: null,
            color: null,
            categoryId: null,
        };
    }

    componentDidMount() {
        let eCategories = Env.getCategories(null, Env.EXPENSE_TYPE);
        let iCategories = Env.getCategories(null, Env.INCOME_TYPE);
        this.setState({
            eCategories,
            iCategories,
        });
    }

    renderActionBar() {
        return(
            <View style={Styles.actionbarBox}>
                <TouchableOpacity style={Styles.backButton} 
                    onPress={() => { this.props.navigation.goBack(); }}>
                    <Image style={Styles.icon18} source={require('./asset/icon-back.png')}/>
                </TouchableOpacity>
                <Text style={Styles.actionbarTitle}>Expenses</Text>
            </View>
        );
    }

    renderCategories() {
        let categories = (this.state.transactionType === Env.EXPENSE_TYPE) ? 
            this.state.eCategories : this.state.iCategories;
            
        return(
            <ScrollView>
                <View style={{ alignItems: 'center'}}>
                    <View style={Styles.addIconListBox}>
                        {
                            categories.map((item, key) => {
                                return(
                                    <TouchableOpacity key={key} 
                                        onPress={() => { 
                                            this.setState({
                                                iKey: key,
                                                icon: item.icon,
                                                color: item.color,
                                                categoryId: item.id
                                            }); 
                                        }}>
                                        <View style={ Styles.addIconBox}>
                                            <Cicon id={key} sid={this.state.iKey}
                                                icon={item.icon} 
                                                color={(this.state.iKey === key) ? item.color : Colors.lightGrey} />
                                            <Text style={{fontSize: Fonts.h6}}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        );
    }

    render() {
        return (
            <View style={Styles.sceneBox}>
                {this.renderActionBar()}
                {this.renderCategories()}
            </View>
        );
    }
}
