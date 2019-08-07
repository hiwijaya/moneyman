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

            showCombobox: false,

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
            <View style={[Styles.actionbarBox, {justifyContent: 'flex-start'}]}>
                <TouchableOpacity style={Styles.backButton} 
                    onPress={() => { this.props.navigation.goBack(); }}>
                    <Image style={Styles.icon18} source={require('./asset/icon-back.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.setState({showCombobox: !this.state.showCombobox}) }}>
                    <View style={Styles.periodButtonBox}>
                        <Text style={Styles.periodButtonLabel}>{this.state.transactionType}</Text>
                        <Image style={Styles.icon8} source={require('./asset/icon-down.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderCombobox() {
        if(this.state.showCombobox){
            return(
                <View style={Styles.comboTypeBox}>
                    <TouchableOpacity 
                        onPress={() => {this.setState({transactionType: Env.EXPENSE_TYPE, showCombobox: false})} }>
                        <View style={Styles.comboTypeItem}>
                            <Text style={{flex: 1, color: Colors.darkGrey}}>Expenses</Text>
                            {this.renderChecked(Env.EXPENSE_TYPE)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {this.setState({transactionType: Env.INCOME_TYPE, showCombobox: false})} }>
                        <View style={Styles.comboTypeItem}>
                            <Text style={{flex: 1, color: Colors.darkGrey}}>Income</Text>
                            {this.renderChecked(Env.INCOME_TYPE)}
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    }

    renderChecked(own){
        if(this.state.transactionType === own){
            return(
                <Image style={Styles.icon18} source={require('./asset/icon-checked-primary.png')}/>
            );
        }
        return null;
    }

    renderCategories() {
        let categories = (this.state.transactionType === Env.EXPENSE_TYPE) ? 
            this.state.eCategories : this.state.iCategories;
            
        return(
            <View>
                {this.renderCombobox()}
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
            </View>
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
