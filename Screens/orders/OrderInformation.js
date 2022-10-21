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
    Modal, Pressable,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from "react-native-network-info";

import CalendarScreen from '@blacksakura013/th-datepicker'

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
import { cond } from 'react-native-reanimated';

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
        console.log('InCome> ', route.params.data)
        InCome()
    }, []);
    const [btn, setBtn] = useState([{ name: 'ประวัติการซื้อ', state: true }, { name: 'ประวัติการขาย', state: false }, { name: 'จำนวนคงเหลือ', state: false, }, { name: 'ราคาขาย', state: false }]);

    const [loading, setLoading] = useStateIfMounted(true);
    const [loading_backG, setLoading_backG] = useStateIfMounted(true);
    const [Sp000211Objloading, setSp000211Objloading] = useState([]);
    const [Oe404Objloading, setOe404Objloading] = useStateIfMounted(true);
    const [Oe304Objloading, setOe304Objloading] = useStateIfMounted(true);

    const [SHOWWLSKUQTYBYGOODSKEY, setSHOWWLSKUQTYBYGOODSKEY] = useState([]);


    const [arraySp000211, setArraySp000211] = useState([]);
    const [arrayOe404Obj, setArrayOe404Obj] = useState([]);
    const [arrayOe304Obj, setArrayOe304Obj] = useState([]);
    const [arrayObj, setArrayObj] = useState([]);

    const [data, setData] = useStateIfMounted({
        secureTextEntry: true,
    });
    const [modalVisible, setModalVisible] = useState(true);
    const [radioIndex1, setRadioIndex1] = useState(6);
    const [radioIndex2, setRadioIndex2] = useState(6);
    const [radioIndex3, setRadioIndex3] = useState(6);
    const [start_date, setS_date] = useState(new Date());
    const [end_date, setE_date] = useState(new Date())
    const [Fstart_date, setFS_date] = useState(start_date);
    const [Fend_date, setFE_date] = useState(end_date)
    const image = '../../images/UI/Asset35.png';
    const radio_props = [
        { label: 'ปีก่อน', value: 'lastyear' },
        { label: 'ปีนี้', value: 'nowyear' },
        { label: 'เดือนนี้', value: 'nowmonth' },
        { label: 'เดือนก่อน', value: 'lastmonth' },
        { label: 'เมื่อวาน', value: 'lastday' },
        { label: 'วันนี้', value: 'nowday' },
        { label: null, value: null }
    ];
    useEffect(() => {
        setRadio_menu3(1, radio_props[5].value)
    }, [])
    const setRadio_menu1 = (index, val) => {
        const Radio_Obj = safe_Format.Radio_menu(index, val)
        setRadioIndex1(Radio_Obj.index)
        if (val != null) {
            setS_date(new Date(Radio_Obj.sdate))
            setE_date(new Date(Radio_Obj.edate))
        }
        setRadioIndex2(2)
        setRadioIndex3(2)
    }
    const setRadio_menu2 = (index, val) => {
        const Radio_Obj = safe_Format.Radio_menu(index, val)
        setRadioIndex2(Radio_Obj.index)
        if (val != null) {
            setS_date(new Date(Radio_Obj.sdate))
            setE_date(new Date(Radio_Obj.edate))
        }
        setRadioIndex1(2)
        setRadioIndex3(2)
    }
    const setRadio_menu3 = (index, val) => {
        const Radio_Obj = safe_Format.Radio_menu(index, val)
        setRadioIndex3(Radio_Obj.index)
        if (val != null) {
            setS_date(new Date(Radio_Obj.sdate))
            setE_date(new Date(Radio_Obj.edate))
        }
        setRadioIndex1(2)
        setRadioIndex2(2)
    }

    useEffect(() => {
        console.log('>> machineNum :', registerReducer.machineNum + '\n\n\n\n')
    }, [registerReducer.machineNum]);

    const closeLoading = () => {
        setLoading(false);
    };
    const letsLoading = () => {
        setLoading(true);
    };

    const InCome = async () => {

        setFS_date(start_date)
        setFE_date(end_date)
        await letsLoading()

        await fetchInCome()

        //  setArrayObj(arrayResult)
    }
    const SInCome = async () => {
        setFS_date(start_date)
        setFE_date(end_date)
        await fetchSHOWWLSKUQTYBYGOODSKEY()
        // await letsLoading()
        setModalVisible(false)
        // await fetchInCome()

        //  setArrayObj(arrayResult)
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
            await closeLoading()
            await fetchOe404(tempGuid)
            await setOe404Objloading(false)
            await fetchOe304(tempGuid)
            await setOe304Objloading(false)
            await fetchSp000211(tempGuid)
            await setSp000211Objloading(false)

        } else {
            console.log('()')
            await fetchSHOWWLSKUQTYBYGOODSKEY()
            await closeLoading()
            await fetchOe404()
            await setOe404Objloading(false)
            await fetchOe304()
            await setOe304Objloading(false)
            await fetchSp000211()
            await setSp000211Objloading(false)

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
                'BPAPUS-PARAM': '{\"TO_DATE\": \"' + safe_Format.setnewdateF(safe_Format.checkDate(Fend_date)) + '\",\"GOODS_KEY\": \"' + route.params.data.GOODS_KEY + '\"}',
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
                                navigation.replace('LoginScreen')
                            )
                        }]);

                }
                console.error('ERROR at fetchContent >> ' + error)
            })
    }
    const fetchSp000211 = async (tempGuid) => {
        console.log('fetchSp000211 >> ')
        setArraySp000211([])
        setSp000211Objloading(true)
        await fetch(databaseReducer.Data.urlser + '/LookupErp', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': tempGuid ? tempGuid : loginReducer.guid,
                'BPAPUS-FUNCTION': 'Sp000211',
                'BPAPUS-PARAM': '',
                'BPAPUS-FILTER': "",
                'BPAPUS-ORDERBY': '',
                'BPAPUS-OFFSET': '0',
                'BPAPUS-FETCH': '0',
            }),
        })
            .then((response) => response.json())
            .then(async (json) => {
                let responseData = JSON.parse(json.ResponseData);
                if (responseData.RECORD_COUNT > 0) {
                    console.log('Sp000211 >> ', responseData.Sp000211)
                    for (var i in responseData.Sp000211) {
                        await SearchGoodsInfoWPurcPrice(tempGuid ? tempGuid : loginReducer.guid, responseData.Sp000211[i])
                    }
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
                                navigation.replace('LoginScreen')
                            )
                        }]);

                }
                console.error('ERROR at fetchContent >> ' + error)
            })
    }
    const SearchGoodsInfoWPurcPrice = async (tempGuid, Sp211) => {
        let Sp000211 = arraySp000211

        await fetch(databaseReducer.Data.urlser + '/UpdateErp', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': tempGuid,
                'BPAPUS-FUNCTION': 'SearchGoodsInfoWPurcPrice',
                'BPAPUS-PARAM': '{\"APPRB_KEY\":\"' + Sp211.ARPRB_KEY + '\"}',
                'BPAPUS-FILTER': "",
                'BPAPUS-ORDERBY': '',
                'BPAPUS-OFFSET': '0',
                'BPAPUS-FETCH': '0',
            }),
        })
            .then((response) => response.json())
            .then(async (json) => {
                let responseData = JSON.parse(json.ResponseData);
                if (responseData.RECORD_COUNT > 0) {
                    let InfoWPurcPrice = responseData.SearchGoodsInfoWPurcPrice
                    if (InfoWPurcPrice.length > 0) {
                        let obj = {
                            WPurcPrice: Sp211,
                            InfoWPurcPrice: InfoWPurcPrice,
                        }
                        Sp000211.push(obj)
                    }
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
                                navigation.replace('LoginScreen')
                            )
                        }]);

                }
                console.error('ERROR at fetchContent >> ' + error)
            })
        await setArraySp000211(Sp000211)
    }
    const fetchOe404 = async (tempGuid) => {
        setArrayOe404Obj([])
        setOe404Objloading(true)
        await fetch(databaseReducer.Data.urlser + '/LookupErp', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': tempGuid ? tempGuid : loginReducer.guid,
                'BPAPUS-FUNCTION': 'Oe000404',
                'BPAPUS-PARAM': '',
                'BPAPUS-FILTER': "",
                'BPAPUS-ORDERBY': '',
                'BPAPUS-OFFSET': '0',
                'BPAPUS-FETCH': '0',
            }),
        })
            .then((response) => response.json())
            .then(async (json) => {
                let responseData = JSON.parse(json.ResponseData);
                if (responseData.RECORD_COUNT > 0) {
                    console.log(responseData.Oe000404)
                    for (var i in responseData.Oe000404) {
                        await GetReceiveDocinfo(tempGuid ? tempGuid : loginReducer.guid, responseData.Oe000404[i])
                    }
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
                                navigation.replace('LoginScreen')
                            )
                        }]);

                }
                console.error('ERROR at fetchContent >> ' + error)
            })
        for (var i in arrayOe404Obj) {
            console.log()
            console.log(arrayOe404Obj[i].Oe000404.DI_KEY)
            console.log(arrayOe404Obj[i].Transtkd)
            console.log()

        }

    }
    const GetReceiveDocinfo = async (tempGuid, Oe000404) => {
        let Oe404Obj = arrayOe404Obj

        await fetch(databaseReducer.Data.urlser + '/UpdateErp', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': tempGuid,
                'BPAPUS-FUNCTION': 'GetReceiveDocinfo',
                'BPAPUS-PARAM': '{\"DI_KEY\":\"' + Oe000404.DI_KEY + '\"}',
                'BPAPUS-FILTER': "",
                'BPAPUS-ORDERBY': '',
                'BPAPUS-OFFSET': '0',
                'BPAPUS-FETCH': '0',
            }),
        })
            .then((response) => response.json())
            .then(async (json) => {
                let responseData = JSON.parse(json.ResponseData);
                if (responseData.RECORD_COUNT > 0) {
                    let Transtkd = responseData.TRANSTKD.filter((Transtkd) => { return Transtkd.GOODS_CODE == route.params.data.GOODS_CODE })
                    if (Transtkd.length > 0) {

                        let obj = {
                            Oe000404: Oe000404,
                            Docinfo: responseData.DOCINFO,
                            Transtkh: responseData.TRANSTKH,
                            Transtkd: Transtkd,

                        }

                        Oe404Obj.push(obj)

                    }
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
                                navigation.replace('LoginScreen')
                            )
                        }]);

                }
                console.error('ERROR at fetchContent >> ' + error)
            })
        await setArrayOe404Obj(Oe404Obj)
    }
    const fetchOe304 = async (tempGuid) => {
        setArrayOe304Obj([])
        setOe304Objloading(true)
        await fetch(databaseReducer.Data.urlser + '/LookupErp', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': tempGuid ? tempGuid : loginReducer.guid,
                'BPAPUS-FUNCTION': 'Oe000304',
                'BPAPUS-PARAM': '',
                'BPAPUS-FILTER': "",
                'BPAPUS-ORDERBY': '',
                'BPAPUS-OFFSET': '0',
                'BPAPUS-FETCH': '0',
            }),
        })
            .then((response) => response.json())
            .then(async (json) => {
                let responseData = JSON.parse(json.ResponseData);
                if (responseData.RECORD_COUNT > 0) {
                    console.log(responseData.Oe000304)
                    for (var i in responseData.Oe000304) {
                        await GetInvoiceDocinfo(tempGuid ? tempGuid : loginReducer.guid, responseData.Oe000304[i])
                    }
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
                                navigation.replace('LoginScreen')
                            )
                        }]);

                }
                console.error('ERROR at fetchContent >> ' + error)
            })
        for (var i in arrayOe304Obj) {
            console.log()
            console.log(arrayOe304Obj[i].Oe000304.DI_KEY)
            console.log(arrayOe304Obj[i].Transtkd)
            console.log()

        }

    }
    const GetInvoiceDocinfo = async (tempGuid, Oe000304) => {
        let Oe304Obj = arrayOe304Obj

        await fetch(databaseReducer.Data.urlser + '/UpdateErp', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': tempGuid,
                'BPAPUS-FUNCTION': 'GetInvoiceDocinfo',
                'BPAPUS-PARAM': '{\"DI_KEY\":\"' + Oe000304.DI_KEY + '\"}',
                'BPAPUS-FILTER': "",
                'BPAPUS-ORDERBY': '',
                'BPAPUS-OFFSET': '0',
                'BPAPUS-FETCH': '0',
            }),
        })
            .then((response) => response.json())
            .then(async (json) => {
                let responseData = JSON.parse(json.ResponseData);
                if (responseData.RECORD_COUNT > 0) {
                    let Transtkd = responseData.TRANSTKD.filter((Transtkd) => { return Transtkd.GOODS_CODE == route.params.data.GOODS_CODE })
                    if (Transtkd.length > 0) {

                        let obj = {
                            Oe000304: Oe000304,
                            Docinfo: responseData.DOCINFO,
                            Transtkh: responseData.TRANSTKH,
                            Transtkd: Transtkd,

                        }

                        Oe304Obj.push(obj)

                    }
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
                                navigation.replace('LoginScreen')
                            )
                        }]);

                }
                console.error('ERROR at fetchContent >> ' + error)
            })
        await setArrayOe304Obj(Oe304Obj)
    }

    return (

        <SafeAreaView style={container1}>
            <StatusBar hidden={true} />
            <ImageBackground source={require(image)} onLoadEnd={() => { setLoading_backG(false) }} resizeMode="cover" style={styles.image}>
                {!loading_backG ?
                    < View style={{
                        flex: 1
                    }}>
                        <View>

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
                                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                                        <FontAwesome name="calendar" color={Colors.fontColor2} size={FontSize.large} />
                                    </TouchableOpacity>
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
                            <View style={styles.centeredView}>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        setModalVisible(!modalVisible);
                                    }}>
                                    < TouchableOpacity
                                        onPress={() => setModalVisible(!modalVisible)}
                                        style={styles.centeredView}>
                                        <View>
                                            <View style={styles.modalView}>
                                                <View style={{
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row'
                                                }}>
                                                    <View width={20}></View>
                                                    <Text style={styles.modalText}>เลือกการค้นหา</Text>
                                                    <Pressable style={{ alignItems: 'flex-end' }} onPress={() => setModalVisible(!modalVisible)}>
                                                        <FontAwesome name="close" color={Colors.fontColor2} size={FontSize.large} />
                                                    </Pressable>
                                                </View>
                                                <View style={{ backgroundColor: Colors.fontColor2, borderRadius: 20, padding: 10 }}>
                                                    <View style={{ paddingBottom: 10 }}>
                                                        <RadioGroup
                                                            style={{
                                                                flexDirection: 'row',
                                                                paddingLeft: 10
                                                            }}
                                                            selectedIndex={radioIndex1}
                                                            onSelect={(index, value) => setRadio_menu1(index, value)}>
                                                            <RadioButton value={radio_props[0].value} >
                                                                <Text style={{ fontSize: FontSize.medium, width: 100, color: 'black', fontWeight: 'bold', }}>{radio_props[0].label}</Text>
                                                            </RadioButton>
                                                            <RadioButton value={radio_props[1].value} >
                                                                <Text style={{ fontSize: FontSize.medium, color: 'black', fontWeight: 'bold', }}>{radio_props[1].label}</Text>
                                                            </RadioButton>
                                                        </RadioGroup>
                                                        <RadioGroup
                                                            style={{
                                                                flexDirection: 'row',
                                                                paddingLeft: 10
                                                            }}
                                                            selectedIndex={radioIndex2}
                                                            onSelect={(index, value) => setRadio_menu2(index, value)}>
                                                            <RadioButton value={radio_props[2].value} >
                                                                <Text style={{ fontSize: FontSize.medium, width: 100, color: 'black', fontWeight: 'bold', }}>{radio_props[2].label}</Text>
                                                            </RadioButton>

                                                            <RadioButton value={radio_props[3].value} >
                                                                <Text style={{ fontSize: FontSize.medium, color: 'black', fontWeight: 'bold', }}>{radio_props[3].label}</Text>
                                                            </RadioButton>
                                                        </RadioGroup>
                                                        <RadioGroup
                                                            style={{
                                                                flexDirection: 'row',
                                                                paddingLeft: 10
                                                            }}
                                                            selectedIndex={radioIndex3}
                                                            onSelect={(index, value) => setRadio_menu3(index, value)}>
                                                            <RadioButton value={radio_props[4].value} >
                                                                <Text style={{ fontSize: FontSize.medium, width: 100, color: 'black', fontWeight: 'bold', }}>{radio_props[4].label}</Text>
                                                            </RadioButton>
                                                            <RadioButton value={radio_props[5].value} >
                                                                <Text style={{ fontSize: FontSize.medium, color: 'black', fontWeight: 'bold', }}>{radio_props[5].label}</Text>
                                                            </RadioButton>
                                                        </RadioGroup>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row', justifyContent: 'space-between',
                                                        alignItems: 'center', marginBottom: 10,
                                                    }}>
                                                        <Text style={{ fontSize: FontSize.medium, marginRight: 5, color: 'black', fontWeight: 'bold', }}>ตั้งแต่</Text>
                                                        <CalendarScreen
                                                            value={start_date}
                                                            onChange={(vel) => setS_date(vel)}
                                                            language={'th'}
                                                            era={'be'}
                                                            format={'DD/MM/YYYY'}
                                                            borderColor={Colors.primaryColor}
                                                            linkTodateColor={Colors.itemColor}
                                                            calendarModel={{ backgroundColor: Colors.backgroundColor, buttonSuccess: { backgroundColor: Colors.itemColor }, pickItem: { color: Colors.itemColor } }}
                                                            borderWidth={1}
                                                            icon={{ color: Colors.primaryColor }}
                                                            fontSize={FontSize.medium}
                                                            fontColor={Colors.fontColor}
                                                            width={250}
                                                            borderRadius={10} />
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row', justifyContent: 'space-between',
                                                        alignItems: 'center', marginBottom: 10
                                                    }}>
                                                        <Text style={{ fontSize: FontSize.medium, color: 'black', fontWeight: 'bold', }}>ถึง</Text>
                                                        <CalendarScreen
                                                            value={end_date}
                                                            onChange={(vel) => setE_date(vel)}
                                                            language={'th'}
                                                            era={'be'}
                                                            format={'DD/MM/YYYY'}
                                                            borderColor={Colors.primaryColor}
                                                            linkTodateColor={Colors.itemColor}
                                                            calendarModel={{ backgroundColor: Colors.backgroundColor, buttonSuccess: { backgroundColor: Colors.itemColor }, pickItem: { color: Colors.itemColor } }}
                                                            borderWidth={1}
                                                            icon={{ color: Colors.primaryColor }}
                                                            fontSize={FontSize.medium}
                                                            fontColor={Colors.fontColor}
                                                            width={250}
                                                            borderRadius={10} />
                                                    </View>
                                                    <Pressable
                                                        style={[styles.button, styles.buttonClose]}
                                                        onPress={() => SInCome()}>
                                                        <Text style={styles.textStyle}>ตกลง</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Modal>
                            </View>


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

                                {btn[0].state && (
                                    Oe404Objloading ? (<View
                                        style={{
                                            opacity: 0.5,
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                        }}>
                                        <ActivityIndicator
                                            style={{
                                                borderRadius: 15,
                                                backgroundColor: null,
                                                width: 100,
                                                height: 100,
                                                alignSelf: 'center',
                                            }}
                                            animating={true}
                                            size="large"
                                            color={Colors.lightPrimiryColor}
                                        />
                                    </View>) : (
                                        <ScrollView horizontal={true}>
                                            <View style={{
                                                flexDirection: 'column',
                                                padding: 5,
                                            }}>
                                                {arrayOe404Obj.length > 0 && arrayOe404Obj.filter((token404) => { return Number(token404.Oe000404.DI_DATE) >= Number(safe_Format.setnewdateF(safe_Format.checkDate(Fstart_date))) && Number(token404.Oe000404.DI_DATE) <= Number(safe_Format.setnewdateF(safe_Format.checkDate(Fend_date))) }).length > 0 ? (
                                                    <>
                                                        <View
                                                            style={{ flexDirection: 'row', borderBottomColor: Colors.fontColor, borderBottomWidth: 1 }}
                                                        >

                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                วันที่
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.4, padding: 5 }}>
                                                                เลขที่
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                รหัสเจ้าหนี้

                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.5, padding: 5 }}>
                                                                ชื่อเจ้าหนี้
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                รหัสซื้อขาย
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                บรรจุ
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ซื้อ
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                แถม
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ต่อหน่วย
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ส่วนลด
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                มูลค่า
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ลดรวม
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                สุทธิ
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ต่อหน่วย
                                                            </Text>
                                                        </View>
                                                        <ScrollView>
                                                            {arrayOe404Obj.filter((token404) => { return Number(token404.Oe000404.DI_DATE) >= Number(safe_Format.setnewdateF(safe_Format.checkDate(Fstart_date))) && Number(token404.Oe000404.DI_DATE) <= Number(safe_Format.setnewdateF(safe_Format.checkDate(Fend_date))) }).map((item) => {
                                                                return (
                                                                    item.Transtkd.map((Transtkditem) => {
                                                                        return (
                                                                            <View style={{ flexDirection: 'row' }}>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.dateFormat(item.Oe000404.DI_DATE)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.4, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(item.Oe000404.DI_REF)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(item.Oe000404.AP_CODE)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.5, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(item.Oe000404.AP_NAME)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(Transtkditem.GOODS_CODE)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(Transtkditem.TRD_UTQNAME)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(Transtkditem.TRD_U_PRC)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(Transtkditem.TRD_Q_FREE)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(Transtkditem.TRD_K_U_PRC)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(Transtkditem.TRD_DSC_KEYIN)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(Transtkditem.TRD_DSC_KEYINV)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(Transtkditem.TRD_TDSC_KEYINV)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(Transtkditem.TRD_G_AMT)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(Transtkditem.TRD_N_AMT)}
                                                                                </Text>

                                                                            </View>
                                                                        )
                                                                    })
                                                                )
                                                            }
                                                            )}
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

                                    )
                                )}

                                {btn[1].state && (
                                    Oe304Objloading ? (<View
                                        style={{
                                            opacity: 0.5,
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                        }}>
                                        <ActivityIndicator
                                            style={{
                                                borderRadius: 15,
                                                backgroundColor: null,
                                                width: 100,
                                                height: 100,
                                                alignSelf: 'center',
                                            }}
                                            animating={true}
                                            size="large"
                                            color={Colors.lightPrimiryColor}
                                        />
                                    </View>) : (
                                        <ScrollView horizontal={true}>
                                            <View style={{
                                                flexDirection: 'column',
                                                padding: 5,
                                            }}>
                                                {arrayOe304Obj.length > 0 && arrayOe304Obj.filter((token304) => { return Number(token304.Oe000304.DI_DATE) >= Number(safe_Format.setnewdateF(safe_Format.checkDate(Fstart_date))) && Number(token304.Oe000304.DI_DATE) <= Number(safe_Format.setnewdateF(safe_Format.checkDate(Fend_date))) }).length > 0 ? (
                                                    <>
                                                        <View
                                                            style={{ flexDirection: 'row', borderBottomColor: Colors.fontColor, borderBottomWidth: 1 }}
                                                        >

                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                วันที่
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.4, padding: 5 }}>
                                                                เลขที่
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                รหัสลูกหนี้

                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.5, padding: 5 }}>
                                                                ชื่อลูกหนี้
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                รหัสซื้อขาย
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                บรรจุ
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ขาย
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                แถม
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ต่อหน่วย
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ส่วนลด
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                มูลค่า
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ลดรวม
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                สุทธิ
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ต่อหน่วย
                                                            </Text>
                                                        </View>
                                                        <ScrollView>
                                                            {arrayOe304Obj.filter((token304) => { return Number(token304.Oe000304.DI_DATE) >= Number(safe_Format.setnewdateF(safe_Format.checkDate(Fstart_date))) && Number(token304.Oe000304.DI_DATE) <= Number(safe_Format.setnewdateF(safe_Format.checkDate(Fend_date))) }).map((item) => {
                                                                return (
                                                                    item.Transtkd.map((Transtkditem) => {
                                                                        return (
                                                                            <View style={{ flexDirection: 'row' }}>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.dateFormat(item.Oe000304.DI_DATE)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.4, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(item.Oe000304.DI_REF)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(item.Oe000304.AR_CODE)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.5, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(item.Oe000304.AR_NAME)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(Transtkditem.GOODS_CODE)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(Transtkditem.TRD_UTQNAME)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(Transtkditem.TRD_U_PRC)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(Transtkditem.TRD_Q_FREE)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(Transtkditem.TRD_K_U_PRC)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(Transtkditem.TRD_DSC_KEYIN)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(Transtkditem.TRD_DSC_KEYINV)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(Transtkditem.TRD_TDSC_KEYINV)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(Transtkditem.TRD_G_AMT)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(Transtkditem.TRD_N_AMT)}
                                                                                </Text>

                                                                            </View>
                                                                        )
                                                                    })
                                                                )
                                                            }
                                                            )}
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

                                    ))}
                                {btn[2].state && (
                                    <ScrollView horizontal={true}>

                                        <View style={{
                                            flexDirection: 'column',
                                            padding: 5,
                                        }}>
                                            {SHOWWLSKUQTYBYGOODSKEY.length > 0 ? (
                                                <>
                                                    <View
                                                        style={{ flexDirection: 'row', borderBottomColor: Colors.fontColor, borderBottomWidth: 1 }}
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
                                    Sp000211Objloading ? (<View
                                        style={{
                                            opacity: 0.5,
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                        }}>
                                        <ActivityIndicator
                                            style={{
                                                borderRadius: 15,
                                                backgroundColor: null,
                                                width: 100,
                                                height: 100,
                                                alignSelf: 'center',
                                            }}
                                            animating={true}
                                            size="large"
                                            color={Colors.lightPrimiryColor}
                                        />
                                    </View>) : (
                                        <ScrollView horizontal={true}>
                                            <View style={{
                                                flexDirection: 'column',
                                                padding: 5,
                                            }}>
                                                {arraySp000211.length > 0 ? (
                                                    <>
                                                        <View
                                                            style={{ flexDirection: 'row', borderBottomColor: Colors.fontColor, borderBottomWidth: 1 }}
                                                        >

                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.2, padding: 5 }}>
                                                                รหัสตารางราคา
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.4, padding: 5 }}>
                                                                ชื่อตารางราคา
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.4, padding: 5 }}>
                                                                รหัสซื้อขาย
                                                            </Text>

                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.2, padding: 5 }}>
                                                                บรรจุ

                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ราคาขาย
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                %ส่วนลด
                                                            </Text>
                                                            {/*   <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ราคาสุทธิ
                                                            </Text>
                                                           <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ทุนไม่รวมภพ.
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                ทุนรวมภพ.
                                                            </Text>
                                                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', width: deviceWidth * 0.3, padding: 5 }}>
                                                                กำไรขั้นต้น
                                                            </Text> */}
                                                        </View>
                                                        <ScrollView>
                                                            {arraySp000211.map((item) => {
                                                                return (
                                                                    // WPurcPrice
                                                                    item.InfoWPurcPrice.filter((TokenSp000211) => { return TokenSp000211.GOODS_CODE == route.params.data.GOODS_CODE }).map((TWPurcPriceitem) => {
                                                                        return (
                                                                            <View style={{ flexDirection: 'row' }}>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.2, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(item.WPurcPrice.ARPRB_KEY)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.4, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(item.WPurcPrice.ARPRB_NAME)}
                                                                                </Text>

                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.4, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(TWPurcPriceitem.GOODS_CODE)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.2, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(TWPurcPriceitem.UTQ_NAME)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(TWPurcPriceitem.APPLU_U_PRC)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(TWPurcPriceitem.APPLU_U_DSC)}
                                                                                </Text>
                                                                                {/* <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.massageFormat(TWPurcPriceitem.APPLU_U_PRC - TWPurcPriceitem.APPLU_U_DSC)}
                                                                                </Text>
                                                                             <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(TWPurcPriceitem.InfoWPurcPrice.TRD_G_SELL)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(TWPurcPriceitem.InfoWPurcPrice.TRD_G_AMT)}
                                                                                </Text>
                                                                                <Text style={{ color: Colors.fontColor, width: deviceWidth * 0.3, padding: 5 }}>
                                                                                    {safe_Format.currencyFormat(TWPurcPriceitem.InfoWPurcPrice.TRD_COMM_RATE)}
                                                                                </Text> */}

                                                                            </View>
                                                                        )
                                                                    })
                                                                )
                                                            }
                                                            )}
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
                                    )
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: deviceWidth,
    },
    modalView: {
        backgroundColor: Colors.backgroundLoginColor,
        borderRadius: 20,
        padding: 10,
        width: "auto",
        shadowColor: "#000",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },

    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: Colors.backgroundLoginColor,
    },
    textButton: {
        fontSize: FontSize.large,
        color: Colors.fontColor2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.fontColor2
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: Colors.fontColor2,
        fontSize: FontSize.medium
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
