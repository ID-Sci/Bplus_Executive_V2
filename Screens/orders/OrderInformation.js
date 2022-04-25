import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Image,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert,
    Platform,
    BackHandler,
    StatusBar,

    ScrollView,
    TouchableNativeFeedback,
    TouchableOpacity,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from "react-native-network-info";



import { SafeAreaView } from 'react-native-safe-area-context';


import { useStateIfMounted } from 'use-state-if-mounted';



import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


import { useSelector, connect, useDispatch } from 'react-redux';



import { Language, changeLanguage } from '../../translations/I18n';
import { FontSize } from '../../components/FontSizeHelper';


import * as loginActions from '../../src/actions/loginActions';
import * as registerActions from '../../src/actions/registerActions';
import * as databaseActions from '../../src/actions/databaseActions';

import Colors from '../../src/Colors';
import * as safe_Format from '../../src/safe_Format';
import { fontSize, fontWeight, paddingTop } from 'styled-system';
import { faAward } from '@fortawesome/free-solid-svg-icons';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const OrderInformation = ({ route }) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const registerReducer = useSelector(({ registerReducer }) => registerReducer);
    const loginReducer = useSelector(({ loginReducer }) => loginReducer);
    const databaseReducer = useSelector(({ databaseReducer }) => databaseReducer);
    const {
        container2,
        container1,
        button,
        textButton,
        topImage,
        tabbar,
        buttonContainer,
    } = styles;
    var ser_die = true
    useEffect(() => {
        console.log('InCome')
        InCome()

        //backsakura013
    }, []);
    const [btn, setBtn] = useState([{ name: 'ประวัติการซื้อ', state: true }, { name: 'ประวัติการขาย', state: false }, { name: 'จำนวนคงเหลือ', state: false, }, { name: 'ราคราขาย', state: false }]);

    const [loading, setLoading] = useStateIfMounted(true);
    const [loading_backG, setLoading_backG] = useStateIfMounted(true);
    const [SHOWWLSKUQTYBYGOODSKEY, setSHOWWLSKUQTYBYGOODSKEY] = useState([]);

    const [Sp000221, setSp000221] = useState([]);
    const [arrayObj, setArrayObj] = useState([]);

    const [data, setData] = useStateIfMounted({
        secureTextEntry: true,
    });

    const image = '../../images/UI/Asset35.png';

    useEffect(() => {
        console.log('>> machineNum :', registerReducer.machineNum + '\n\n\n\n')
    }, [registerReducer.machineNum]);
    useEffect(() => {
        console.log(safe_Format.gettoDate())
    }, [Sp000221])
    const closeLoading = () => {
        setLoading(false);
    };
    const letsLoading = () => {
        setLoading(true);
    };

    const InCome = async () => {

        await letsLoading()

        await fetchInCome()
        await closeLoading()
        // setArrayObj(arrayResult)
    }
    const regisMacAdd = async () => {
        let tempGuid = await safe_Format._fetchGuidLog(databaseReducer.Data.urlser, loginReducer.serviceID, registerReducer.machineNum, loginReducer.userNameED, loginReducer.passwordED)
        await dispatch(loginActions.guid(tempGuid))
        fetchInCome(tempGuid)
    };

    const set_StateBtn = (index) => {
        let temp_stateBtn = [];
        console.log(index)
        for (var i in btn) {
            console.log(`btn[${i}] >> ${btn[i].name}`)
            let ObjBtn = {}
            if (i == index)
                ObjBtn = {
                    name: btn[i].name,
                    state: true
                }
            else
                ObjBtn = {
                    name: btn[i].name,
                    state: false
                }
            temp_stateBtn.push(ObjBtn)
        }
        setBtn(temp_stateBtn)
    }

    const fetchInCome = async (tempGuid) => {
        console.log(tempGuid)
        if (tempGuid) {
            console.log('(tempGuid)')
            await fetchSHOWWLSKUQTYBYGOODSKEY(tempGuid)
            await fetchSp000221(tempGuid)
        } else {
            console.log('()')
            await fetchSHOWWLSKUQTYBYGOODSKEY()
            await fetchSp000221()
        }

    }

    const fetchSHOWWLSKUQTYBYGOODSKEY = async (tempGuid) => {
        console.log('fetchSHOWWLSKUQTYBYGOODSKEY >> ')

        await fetch(databaseReducer.Data.urlser + '/Executive', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': tempGuid ? tempGuid : loginReducer.guid,
                'BPAPUS-FUNCTION': 'SHOWWLSKUQTYBYGOODSKEY',
                'BPAPUS-PARAM': '{\"TO_DATE\": \"' + safe_Format.gettoDate() + '\",\"GOODS_KEY\": \"' + route.params.data.GOODS_KEY + '\"}',
                'BPAPUS-FILTER': '',
                'BPAPUS-ORDERBY': '',
                'BPAPUS-OFFSET': '0',
                'BPAPUS-FETCH': '0',
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                let responseData = JSON.parse(json.ResponseData);
                if (responseData.RECORD_COUNT > 0) {
                    console.log('SHOWWLSKUQTYBYGOODSKEY >> ', responseData.SHOWWLSKUQTYBYGOODSKEY)
                    setSHOWWLSKUQTYBYGOODSKEY(responseData.SHOWWLSKUQTYBYGOODSKEY)
                }

            })
            .catch((error) => {
                if (ser_die) {
                    ser_die = false
                    regisMacAdd()
                } else {
                    console.log('Function Parameter Required');
                    let temp_error = 'error_ser.' + 610;
                    console.log('>> ', temp_error)
                    Alert.alert(
                        Language.t('alert.errorTitle'),
                        Language.t(temp_error), [{
                            text: Language.t('alert.ok'), onPress: () => navigation.dispatch(
                                navigation.replace('LoginStackScreen')
                            )
                        }]);

                }
                console.error('ERROR at fetchContent >> ' + error)
            })
    }
    const fetchSp000221 = async (tempGuid) => {
        console.log('fetchSp000221 >> ')

        await fetch(databaseReducer.Data.urlser + '/LookupErp', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': tempGuid ? tempGuid : loginReducer.guid,
                'BPAPUS-FUNCTION': 'Sp000221',
                'BPAPUS-PARAM': '',
                'BPAPUS-FILTER': "AND GOODS_CODE = '" + route.params.data.GOODS_CODE + "'",
                'BPAPUS-ORDERBY': '',
                'BPAPUS-OFFSET': '0',
                'BPAPUS-FETCH': '0',
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                let responseData = JSON.parse(json.ResponseData);
                if (responseData.RECORD_COUNT > 0) {
                    console.log('Sp000221 >> ', responseData.Sp000221)
                    setSp000221(responseData.Sp000221)
                }

            })
            .catch((error) => {
                if (ser_die) {
                    ser_die = false
                    regisMacAdd()
                } else {
                    console.log('Function Parameter Required');
                    let temp_error = 'error_ser.' + 610;
                    console.log('>> ', temp_error)
                    Alert.alert(
                        Language.t('alert.errorTitle'),
                        Language.t(temp_error), [{
                            text: Language.t('alert.ok'), onPress: () => navigation.dispatch(
                                navigation.replace('LoginStackScreen')
                            )
                        }]);

                }
                console.error('ERROR at fetchContent >> ' + error)
            })
    }

    const fetchTradinghistory = async (tempGuid) => {
        setArrayObj([])
        await fetch(databaseReducer.Data.urlser + '/UpdateErp', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': tempGuid ? tempGuid : loginReducer.guid,
                'BPAPUS-FUNCTION': 'SHOWWLSKUQTYBYGOODSKEY',
                'BPAPUS-PARAM': '{"TO_DATE": " 0","GOODS_KEY","" }',
                'BPAPUS-FILTER': "",
                'BPAPUS-ORDERBY': '',
                'BPAPUS-OFFSET': '0',
                'BPAPUS-FETCH': '0',
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                let responseData = JSON.parse(json.ResponseData);
                if (responseData.RECORD_COUNT > 0) {
                    console.log(responseData.SHOWWLSKUQTYBYGOODSKEY[0])
                    setArrayObj(responseData.SHOWWLSKUQTYBYGOODSKEY)
                }
                setLoading(false)
            })
            .catch((error) => {
                if (ser_die) {
                    ser_die = false
                    regisMacAdd()
                } else {
                    console.log('Function Parameter Required');
                    let temp_error = 'error_ser.' + 610;
                    console.log('>> ', temp_error)
                    Alert.alert(
                        Language.t('alert.errorTitle'),
                        Language.t(temp_error), [{
                            text: Language.t('alert.ok'), onPress: () => navigation.dispatch(
                                navigation.replace('LoginStackScreen')
                            )
                        }]);

                }
                console.error('ERROR at fetchContent >> ' + error)
            })
    }

    return (

        <SafeAreaView style={container1}>
            <StatusBar hidden={true} />
            <ImageBackground source={require(image)} onLoadEnd={() => { setLoading_backG(false) }} resizeMode="cover" style={styles.image}>
                {!loading_backG ?
                    < View style={{
                        flex: 1
                    }}>
                        <StatusBar hidden={true} />
                        <View style={tabbar}>
                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}>
                                    <FontAwesome name="arrow-left" color={Colors.fontColor2} size={FontSize.large} />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        marginLeft: 12,
                                        fontSize: FontSize.medium,
                                        color: Colors.fontColor2
                                    }}>{route.params.header && (`${route.params.header}`)}</Text>
                            </View>
                            <View>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'column',
                        }}>
                            <View style={{
                                paddingBottom: 10,
                                padding: 10,
                            }}>
                                <View style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    paddingBottom: 5
                                }}>
                                    <Text style={{ width: deviceWidth / 4, color: Colors.fontColor }}>{'รหัสซื้อขาย'}</Text>
                                    <Text style={{ color: Colors.fontColor }}>{route.params.data.GOODS_CODE}</Text>
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    paddingBottom: 5
                                }}>
                                    <Text style={{ width: deviceWidth / 4, color: Colors.fontColor }}>{'ชื่อสินค้า'}</Text>
                                    <Text style={{ color: Colors.fontColor }}>{route.params.data.SKU_NAME}</Text>
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    paddingBottom: 5
                                }}>
                                    <Text style={{ width: deviceWidth / 4, color: Colors.fontColor }}>{'หน่วยนับ'}</Text>
                                    <Text style={{ color: Colors.fontColor }}>{route.params.data.UTQ_NAME}</Text>
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    paddingBottom: 5
                                }}>
                                    <Text style={{ width: deviceWidth / 4, color: Colors.fontColor }}>{'รหัสสินค้า'}</Text>
                                    <Text style={{ color: Colors.fontColor }}>{route.params.data.SKU_CODE}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <ScrollView horizontal={true}>
                                {btn.map((Obj, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => set_StateBtn(index)}
                                            style={{
                                                borderTopStartRadius: 20,
                                                borderTopEndRadius: 20,
                                                flexDirection: 'column',
                                                padding: 10,
                                                backgroundColor: Obj.state == true ? Colors.buttonColorPrimary : Colors.itemColor
                                            }}>
                                            <Text
                                                style={{
                                                    color: Colors.buttonTextColor,
                                                    alignSelf: 'center',
                                                    fontSize: FontSize.medium,
                                                    fontWeight: 'bold',
                                                }}>
                                                {Obj.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </View>



                        <View style={{
                            width: deviceWidth,
                            borderBottomStartRadius: 20,
                            borderBottomEndRadius: 20,
                            flexDirection: 'column',
                            padding: 10,
                            backgroundColor: Colors.buttonColorPrimary
                        }}>
                            <View style={{

                                borderRadius: 20,
                                height: deviceHeight * 0.55,
                                padding: 10,
                                backgroundColor: Colors.backgroundColorSecondary

                            }}>



                                {btn[2].state && (
                                    <ScrollView horizontal={true}>

                                        <View style={{
                                            flexDirection: 'column',
                                            padding: 5,
                                        }}>
                                            {SHOWWLSKUQTYBYGOODSKEY.length > 0 ? (
                                                <>
                                                    <View
                                                        style={{ flexDirection: 'row',borderBottomColor:Colors.fontColor,borderBottomWidth:1 }}
                                                    >
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                            คลัง
                                                        </Text>
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                            ตำแหน่งเก็บ
                                                        </Text>
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                            คงเหลือ
                                                        </Text>
                                                    </View>
                                                    <ScrollView>
                                                        {SHOWWLSKUQTYBYGOODSKEY.map((item) => {
                                                            return (
                                                                <View
                                                                    style={{ flexDirection: 'row' }}
                                                                >
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                        {safe_Format.massageFormat(item.WL_CODE)}
                                                                    </Text>
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                        {safe_Format.massageFormat(item.WL_NAME)}
                                                                    </Text>
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                        {safe_Format.currencyFormat(item.SUM_QTY)}
                                                                    </Text>
                                                                </View>
                                                            )
                                                        })}
                                                    </ScrollView>
                                                </>
                                            ) : (
                                                <View style={{

                                                    justifyContent: 'center',
                                                    alignContent: 'center',

                                                }}>
                                                    <Text style={{
                                                        fontSize: fontSize.large
                                                    }}>
                                                        ไม่มีข้อมูล
                                                    </Text>
                                                </View>
                                            )}
                                        </View>

                                    </ScrollView>
                                )}

                                {btn[3].state && (
                                    <ScrollView horizontal={true}>

                                        <View style={{
                                            flexDirection: 'column',
                                            padding: 5,
                                        }}>
                                            {Sp000221.length > 0 ? (
                                                <>
                                                    <View
                                                        style={{ flexDirection: 'row',borderBottomColor:Colors.fontColor,borderBottomWidth:1 }}
                                                    >
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.4, padding: 5 }}>
                                                            รหัสตารางราคาขาย
                                                        </Text>
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                            ตารางราคาขาย
                                                        </Text>
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                            รหัสซื้อขาย
                                                        </Text>
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                            ชื่อสินค้า
                                                        </Text>
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                            ข้อมูลเตือน

                                                        </Text>
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                            ราคราขาย
                                                        </Text>
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                            ส่วนลด
                                                        </Text>


                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                            ประเภทสินค้า
                                                        </Text>
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.2, padding: 5 }}>
                                                            ยี่ห้อ
                                                        </Text>
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                            ประเภททดแทน
                                                        </Text>
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.2, padding: 5 }}>
                                                            สี
                                                        </Text>
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.2, padding: 5 }}>
                                                            ขนาด
                                                        </Text>
                                                        <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.2, padding: 5 }}>
                                                            หมวด
                                                        </Text>
                                                    </View>
                                                    <ScrollView>
                                                        {Sp000221.map((item) => {
                                                            return (
                                                                <View
                                                                    style={{ flexDirection: 'row' }}
                                                                >
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.4, padding: 5 }}>
                                                                        {safe_Format.massageFormat(item.ARPLU_KEY)}
                                                                    </Text>
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                        {safe_Format.massageFormat(item.ARPRB_CODE)}
                                                                    </Text>
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                        {safe_Format.massageFormat(item.GOODS_CODE)}
                                                                    </Text>
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                        {safe_Format.massageFormat(item.SKU_NAME)}
                                                                    </Text>
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                        {safe_Format.massageFormat(item.SKU_ALERT_MSG)}
                                                                    </Text>
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                        {safe_Format.currencyFormat(item.ARPLU_U_PRC)}
                                                                    </Text>
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                        {safe_Format.currencyFormat(item.ARPLU_U_DSC)}
                                                                    </Text>


                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                        {safe_Format.massageFormat(item.SKU_ICCAT)}
                                                                    </Text>
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.2, padding: 5 }}>
                                                                        {safe_Format.massageFormat(item.SKU_BRN)}
                                                                    </Text>
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                        {safe_Format.massageFormat(item.SKU_SKUALT)}
                                                                    </Text>
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.2, padding: 5 }}>
                                                                        {safe_Format.massageFormat(item.SKU_ICCOLOR)}
                                                                    </Text>
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.2, padding: 5 }}>
                                                                        {safe_Format.massageFormat(item.SKU_ICSIZE)}
                                                                    </Text>
                                                                    <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.2, padding: 5 }}>
                                                                        {safe_Format.massageFormat(item.SKU_ICDEPT)}
                                                                    </Text>
                                                                </View>
                                                            )
                                                        })}
                                                    </ScrollView>
                                                </>
                                            ) : (
                                                <View style={{

                                                    justifyContent: 'center',
                                                    alignContent: 'center',

                                                }}>
                                                    <Text style={{
                                                        fontSize: fontSize.large
                                                    }}>
                                                        ไม่มีข้อมูล
                                                    </Text>
                                                </View>
                                            )}
                                        </View>

                                    </ScrollView>
                                )}



                            </View>

                        </View>
                        <TouchableNativeFeedback
                            onPress={() => navigation.goBack()}>
                            <View
                                style={{
                                    margin: 10,
                                    borderRadius: 20,
                                    flexDirection: 'column',
                                    padding: 10,
                                    backgroundColor: Colors.buttonColorPrimary,
                                }}>
                                <Text
                                    style={{
                                        color: Colors.buttonTextColor,
                                        alignSelf: 'center',
                                        fontSize: FontSize.medium,
                                        fontWeight: 'bold',
                                    }}>
                                    {'ย้อนกลับ'}
                                </Text>
                            </View>
                        </TouchableNativeFeedback>

                    </ View> : <View
                        style={{
                            width: deviceWidth,
                            height: deviceHeight,
                            opacity: 0.5,
                            backgroundColor: 'black',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                            position: 'absolute',
                        }}>

                    </View>}

                {loading && (
                    <View
                        style={{
                            width: deviceWidth,
                            height: deviceHeight,
                            opacity: 0.5,
                            backgroundColor: 'black',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                            position: 'absolute',
                        }}>
                        <ActivityIndicator
                            style={{
                                borderRadius: 15,
                                backgroundColor: null,
                                width: 100,
                                height: 100,
                                alignSelf: 'center',
                            }}
                            animating={loading}
                            size="large"
                            color={Colors.lightPrimiryColor}
                        />
                    </View>
                )}

            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container1: {

        flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    container2: {
        width: deviceWidth,
        height: '100%',
        position: 'absolute',
        backgroundColor: 'white',
        flex: 1,
    },
    tabbar: {
        height: 70,
        padding: 12,
        paddingLeft: 20,
        alignItems: 'center',
        backgroundColor: Colors.itemColor,
        color: Colors.fontColor2,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textTitle2: {
        alignSelf: 'center',
        flex: 2,
        fontSize: FontSize.medium,
        fontWeight: 'bold',
        color: Colors.fontColor,
    },
    imageIcon: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topImage: {
        height: deviceHeight / 3.6,
        width: deviceWidth,
    },
    button: {
        marginTop: 10,
        marginBottom: 25,
        padding: 5,
        alignItems: 'center',
        backgroundColor: Colors.buttonColorPrimary,
        borderRadius: 10,
    },
    textButton: {
        fontSize: FontSize.large,
        color: Colors.fontColor2,
    },
    buttonContainer: {
        marginTop: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 20,
    },
    checkbox: {

        alignSelf: "center",
        borderBottomColor: Colors.fontColor,
        color: Colors.fontColor,

    },
    label: {
        margin: 8,
        color: Colors.fontColor,
    },
});


export default OrderInformation;
