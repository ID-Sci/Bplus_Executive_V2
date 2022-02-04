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

import { Picker, } from 'native-base';

import { SafeAreaView } from 'react-native-safe-area-context';


import { useStateIfMounted } from 'use-state-if-mounted';


import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


import { useSelector, connect, useDispatch } from 'react-redux';



import { Language, changeLanguage } from '../translations/I18n';
import { FontSize } from '../components/FontSizeHelper';


import * as loginActions from '../src/actions/loginActions';
import * as registerActions from '../src/actions/registerActions';
import * as databaseActions from '../src/actions/databaseActions';

import Colors from '../src/Colors';
import { fontSize, fontWeight } from 'styled-system';
import * as safe_Format from '../src/safe_Format';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const DailyCalendar = () => {

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

    useEffect(() => {


        //backsakura013
    }, []);



    const [loading, setLoading] = useStateIfMounted(false);
    const [loading_backG, setLoading_backG] = useStateIfMounted(true);



    var daily = new Date()

    const [dateIndex, set_DateIndex] = useState(1)
    const [monthIndex, set_MonthIndex] = useState(daily.getMonth())
    const [yearIndex, set_yearIndex] = useState(daily.getFullYear() + 543)
    const [menu1, set_menu1] = useState(false)
    const [menu2, set_menu2] = useState(false)
    const [menu3, set_menu3] = useState(false)
    const [menu4, set_menu4] = useState(false)

    const [poppoint, set_poppoint] = useState([])
    const [mappoint, set_mappoint] = useState([])
    const [rarchqDue, set_rarchqDue] = useState([])
    const [rapDue, set_rapDue] = useState([])

    const image = '../images/UI/Asset35.png';



    const closeLoading = () => {
        setLoading(false);
    };
    const letsLoading = () => {
        setLoading(true);
    };
    const setMonthState = (itemValue, itemIndex) => {
        set_MonthIndex(itemIndex)
    }

    useEffect(() => {



    }, [])
    useEffect(() => {
        console.log(`monthIndex ${monthIndex}`)
        if (!loading )
            get_Point()
    }, [monthIndex])
    useEffect(() => {

        console.log(`yearIndex ${yearIndex}`)
        if (!loading)
            get_Point()
    }, [yearIndex])


    const fulldate = () => {
        let d = dateIndex
        let m = monthIndex + 1
        let y = yearIndex - 543
        return `${y}${m.toString().length > 1 ? m : '0' + m}${d.toString().length > 1 ? d : '0' + d}`
    }
    const fetchdate = (d) => {

        let m = monthIndex + 1
        let y = yearIndex - 543
        return `${y}${m.toString().length > 1 ? m : '0' + m}${d.toString().length > 1 ? d : '0' + d}`
    }
    const get_Point = async () => {
        letsLoading()
        await get_poppoint()
        await get_mappoint()
        await get_rarchqDue()
        await get_rapDue()
        closeLoading()
    }

    const get_poppoint = async () => {
        await fetch(databaseReducer.Data.urlser + '/Calendar', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': loginReducer.guid,
                'BPAPUS-FUNCTION': 'SHOWCALENDARPOAPPOINT',
                'BPAPUS-PARAM':
                    '{"FROM_DATE": ' +
                    fetchdate(safe_Format.Day_mont(yearIndex, monthIndex)[0]) +
                    ',"TO_DATE": ' +
                    fetchdate(safe_Format.Day_mont(yearIndex, monthIndex)[safe_Format.Day_mont(yearIndex, monthIndex).length - 1]) +
                    '}',
                'BPAPUS-FILTER': '',
                'BPAPUS-ORDERBY': '',
                'BPAPUS-OFFSET': '0',
                'BPAPUS-FETCH': '0',
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                let responseData = JSON.parse(json.ResponseData);
                set_poppoint(responseData)
                console.log(responseData)
            })
            .catch((error) => {

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


                console.error('ERROR at fetchContent >> ' + error)
            })
    }
    const get_mappoint = async () => {
        await fetch(databaseReducer.Data.urlser + '/Calendar', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': loginReducer.guid,
                'BPAPUS-FUNCTION': 'SHOWCALENDARBKAPPOINT',
                'BPAPUS-PARAM':
                    '{"FROM_DATE": ' +
                    fetchdate(safe_Format.Day_mont(yearIndex, monthIndex)[0]) +
                    ',"TO_DATE": ' +
                    fetchdate(safe_Format.Day_mont(yearIndex, monthIndex)[safe_Format.Day_mont(yearIndex, monthIndex).length - 1]) +
                    '}',
                'BPAPUS-FILTER': '',
                'BPAPUS-ORDERBY': '',
                'BPAPUS-OFFSET': '0',
                'BPAPUS-FETCH': '0',
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                let responseData = JSON.parse(json.ResponseData);
                set_mappoint(responseData)
                console.log(responseData)
            })
            .catch((error) => {

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


                console.error('ERROR at fetchContent >> ' + error)
            })
    }
    const get_rarchqDue = async () => {
        await fetch(databaseReducer.Data.urlser + '/Calendar', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': loginReducer.guid,
                'BPAPUS-FUNCTION': 'SHOWCALENDARARDUE',
                'BPAPUS-PARAM':
                    '{"FROM_DATE": ' +
                    fetchdate(safe_Format.Day_mont(yearIndex, monthIndex)[0]) +
                    ',"TO_DATE": ' +
                    fetchdate(safe_Format.Day_mont(yearIndex, monthIndex)[safe_Format.Day_mont(yearIndex, monthIndex).length - 1]) +
                    '}',
                'BPAPUS-FILTER': '',
                'BPAPUS-ORDERBY': '',
                'BPAPUS-OFFSET': '0',
                'BPAPUS-FETCH': '0',
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                let responseData = JSON.parse(json.ResponseData);
                set_rarchqDue(responseData)
                console.log(responseData)
            })
            .catch((error) => {

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


                console.error('ERROR at fetchContent >> ' + error)
            })
    }
    const get_rapDue = async () => {
        await fetch(databaseReducer.Data.urlser + '/Calendar', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': loginReducer.guid,
                'BPAPUS-FUNCTION': 'SHOWCALENDARAPDUE',
                'BPAPUS-PARAM':
                    '{"FROM_DATE": ' +
                    fetchdate(safe_Format.Day_mont(yearIndex, monthIndex)[0]) +
                    ',"TO_DATE": ' +
                    fetchdate(safe_Format.Day_mont(yearIndex, monthIndex)[safe_Format.Day_mont(yearIndex, monthIndex).length - 1]) +
                    '}',
                'BPAPUS-FILTER': '',
                'BPAPUS-ORDERBY': '',
                'BPAPUS-OFFSET': '0',
                'BPAPUS-FETCH': '0',
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                let responseData = JSON.parse(json.ResponseData);
                set_rapDue(responseData)
                console.log(responseData)
            })
            .catch((error) => {

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


                console.error('ERROR at fetchContent >> ' + error)
            })
    }
    return (
        <SafeAreaView style={container1}>
            <StatusBar hidden={true} />
            <ImageBackground source={require(image)} onLoadEnd={() => { setLoading_backG(false) }} resizeMode="cover" style={styles.image}>
                {!loading_backG ?
                    < >
                        <View  >
                            <Image
                                style={topImage}
                                source={require('../images/UI/Asset43.png')} />
                        </View>
                        <ScrollView>
                            <View style={container1}>

                                <View style={{ padding: 20, marginTop: 0 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <View style={{
                                            marginTop: 10, flexDirection: 'row', justifyContent: 'center',
                                            borderColor: Colors.itemColor, backgroundColor: Colors.backgroundColorSecondary,
                                            borderWidth: 1, padding: 10, borderRadius: 10,
                                            width: deviceWidth / 2.5
                                        }}>
                                            <Text style={{ fontSize: FontSize.large }}></Text>
                                            <Picker
                                                selectedValue={yearIndex}
                                                enabled={true}
                                                mode="dropdown"
                                                style={{ color: Colors.itemColor, width: deviceWidth / 2.6, backgroundColor: Colors.backgroundColorSecondary }}
                                                onValueChange={(itemValue, itemIndex) => set_yearIndex(itemValue, itemIndex)}>
                                                {safe_Format.state_years.map((obj, index) => {
                                                    return (
                                                        <Picker.Item color={Colors.itemColor} label={obj.toString()} value={obj} />
                                                    )
                                                })}
                                            </Picker>
                                        </View>
                                        <View style={{
                                            marginTop: 10, flexDirection: 'row', justifyContent: 'center',
                                            borderColor: Colors.itemColor, backgroundColor: Colors.backgroundColorSecondary,
                                            borderWidth: 1, padding: 10, borderRadius: 10,
                                            width: deviceWidth / 2.5
                                        }}>
                                            <Text style={{ fontSize: FontSize.large }}></Text>
                                            <Picker
                                                selectedValue={monthIndex}
                                                enabled={true}
                                                mode="dropdown"
                                                style={{ color: Colors.itemColor, width: deviceWidth / 2.6, backgroundColor: Colors.backgroundColorSecondary }}
                                                onValueChange={(itemValue, itemIndex) => setMonthState(itemValue, itemIndex)}>
                                                {safe_Format.months_th.map((obj, index) => {
                                                    return (
                                                        <Picker.Item color={Colors.itemColor} label={obj} value={index} />
                                                    )
                                                })}
                                            </Picker>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: FontSize.large }}>
                                            {safe_Format.months_th[monthIndex]}
                                        </Text>
                                    </View>
                                    <View>
                                        <View
                                            style={{
                                                backgroundColor: Colors.backgroundLoginColorSecondary,
                                                flexDirection: 'column',
                                                margin: 10,
                                                borderRadius: 10,
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                                shadowColor: Colors.borderColor,
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 6,
                                                },
                                                shadowOpacity: 0.5,
                                                shadowRadius: 1.0,
                                                elevation: 15,
                                            }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                <View style={{
                                                    width: 30, height: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 15, backgroundColor: null
                                                }}>
                                                    <Text style={{ color: 'red' }}>{'อา'}</Text>
                                                </View>
                                                <View style={{
                                                    width: 30, height: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 15, backgroundColor: null
                                                }}>
                                                    <Text>{'จ'}</Text>
                                                </View>
                                                <View style={{
                                                    width: 30, height: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 15, backgroundColor: null
                                                }}>
                                                    <Text>{'อ'}</Text>
                                                </View>
                                                <View style={{
                                                    width: 30, height: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 15, backgroundColor: null
                                                }}>
                                                    <Text>{'พ'}</Text>
                                                </View>
                                                <View style={{
                                                    width: 30, height: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 15, backgroundColor: null
                                                }}>
                                                    <Text>{'พฤ'}</Text>
                                                </View>
                                                <View style={{
                                                    width: 30, height: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 15, backgroundColor: null
                                                }}>
                                                    <Text>{'ศ'}</Text>
                                                </View>
                                                <View style={{
                                                    width: 30, height: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 15, backgroundColor: null
                                                }}>
                                                    <Text>{'ส'}</Text>
                                                </View>
                                            </View>
                                            {safe_Format.Day_Calendar(yearIndex, monthIndex).map((item, index) => {
                                                return (
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                        <View style={{
                                                            width: 30, height: 30,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 15, backgroundColor: item[0] == dateIndex ? Colors.itemColor : null
                                                        }}>
                                                            <TouchableNativeFeedback onPress={() => set_DateIndex(item[0])}><Text style={{ color: item[0] == dateIndex ? Colors.backgroundColor : 'red' }}>{item[0]}</Text></TouchableNativeFeedback>
                                                        </View>
                                                        <View style={{
                                                            width: 30, height: 30,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 15, backgroundColor: item[1] == dateIndex ? Colors.itemColor : null
                                                        }}>
                                                            <TouchableNativeFeedback onPress={() => set_DateIndex(item[1])}><Text style={{ color: item[1] == dateIndex ? Colors.backgroundColor : 'black' }}>{item[1]}</Text></TouchableNativeFeedback>
                                                        </View>
                                                        <View style={{
                                                            width: 30, height: 30,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 15, backgroundColor: item[2] == dateIndex ? Colors.itemColor : null
                                                        }}>
                                                            <TouchableNativeFeedback onPress={() => set_DateIndex(item[2])}><Text style={{ color: item[2] == dateIndex ? Colors.backgroundColor : 'black' }}>{item[2]}</Text></TouchableNativeFeedback>
                                                        </View>
                                                        <View style={{
                                                            width: 30, height: 30,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 15, backgroundColor: item[3] == dateIndex ? Colors.itemColor : null
                                                        }}>
                                                            <TouchableNativeFeedback onPress={() => set_DateIndex(item[3])}><Text style={{ color: item[3] == dateIndex ? Colors.backgroundColor : 'black' }}>{item[3]}</Text></TouchableNativeFeedback>
                                                        </View>
                                                        <View style={{
                                                            width: 30, height: 30,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 15, backgroundColor: item[4] == dateIndex ? Colors.itemColor : null
                                                        }}>
                                                            <TouchableNativeFeedback onPress={() => set_DateIndex(item[4])}><Text style={{ color: item[4] == dateIndex ? Colors.backgroundColor : 'black' }}>{item[4]}</Text></TouchableNativeFeedback>
                                                        </View>
                                                        <View style={{
                                                            width: 30, height: 30,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 15, backgroundColor: item[5] == dateIndex ? Colors.itemColor : null
                                                        }}>
                                                            <TouchableNativeFeedback onPress={() => set_DateIndex(item[5])}><Text style={{ color: item[5] == dateIndex ? Colors.backgroundColor : 'black' }}>{item[5]}</Text></TouchableNativeFeedback>
                                                        </View>
                                                        <View style={{
                                                            width: 30, height: 30,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: 15, backgroundColor: item[6] == dateIndex ? Colors.itemColor : null
                                                        }}>
                                                            <TouchableNativeFeedback onPress={() => set_DateIndex(item[6])}><Text style={{ color: item[6] == dateIndex ? Colors.backgroundColor : 'black' }}>{item[6]}</Text></TouchableNativeFeedback>
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                        <View>
                                            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, padding: 10 }}>
                                                <Text style={{ fontSize: FontSize.medium, color: 'black' }}>{`รายละเอียดวันที่ ${dateIndex} ${safe_Format.months_th[monthIndex]} ${yearIndex}`}</Text>
                                            </View>
                                            {/* นัดรับ */}
                                            <TouchableNativeFeedback onPress={() => set_menu1(!menu1)}>
                                                <View>

                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: 10

                                                    }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                            {menu1 ? <FontAwesomeIcon name="arrow-down" size={15} color={'black'} style={{ paddingRight: 10 }} /> : <FontAwesomeIcon name="arrow-right" size={15} color={'black'} style={{ paddingRight: 10 }} />}

                                                            <Text style={{ fontSize: FontSize.medium, color: 'black' }}>{`นัดรับ`}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={{ fontSize: FontSize.medium, color: 'black' }}>{`(${poppoint.SHOWCALENDARPOAPPOINT && poppoint.SHOWCALENDARPOAPPOINT.filter((item) => { return (item.TRH_SHIP_DATE == fulldate()) }).length > 0 ? poppoint.SHOWCALENDARPOAPPOINT.filter((item) => { return (item.TRH_SHIP_DATE == fulldate()) }).length : 0})`}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableNativeFeedback>
                                            {menu1 && poppoint.SHOWCALENDARPOAPPOINT && poppoint.SHOWCALENDARPOAPPOINT.filter((item) => { return (item.TRH_SHIP_DATE == fulldate()) }).length > 0 ? <>
                                                {poppoint.SHOWCALENDARPOAPPOINT && poppoint.SHOWCALENDARPOAPPOINT.filter((item) => { return (item.TRH_SHIP_DATE == fulldate()) })
                                                    .map((item) => {
                                                        return (
                                                            <View style={{
                                                                borderBottomColor: 'black',
                                                                borderBottomWidth: 1,

                                                                paddingLeft: 10,
                                                                paddingRight: 10,
                                                                paddingLeft: 10
                                                            }}>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',

                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'รหัสนัดรับ'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${item.APPO_A_AMT}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'ชื่อเจ้าหนี้'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${item.AP_NAME}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'รหัสอ้างอิง'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${item.DI_REF}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'วันที่ยกเลิก'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${safe_Format.dateFormat(item.TRH_CANCEL_DATE)}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'วันที่จัดส่ง'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${safe_Format.dateFormat(item.TRH_SHIP_DATE)}`}</Text>
                                                                </View>
                                                            </View>
                                                        )
                                                    })}
                                            </> : null}
                                            {/* นัดส่ง */}
                                            <TouchableNativeFeedback onPress={() => set_menu2(!menu2)}>
                                                <View>

                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: 10

                                                    }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                            {menu2 ? <FontAwesomeIcon name="arrow-down" size={15} color={'black'} style={{ paddingRight: 10 }} /> : <FontAwesomeIcon name="arrow-right" size={15} color={'black'} style={{ paddingRight: 10 }} />}

                                                            <Text style={{ fontSize: FontSize.medium, color: 'black' }}>{`นัดส่ง`}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={{ fontSize: FontSize.medium, color: 'black' }}>{`(${mappoint.SHOWCALENDARBKAPPOINT && mappoint.SHOWCALENDARBKAPPOINT.filter((item) => { return (item.TRH_SHIP_DATE == fulldate()) }).length > 0 ? mappoint.SHOWCALENDARBKAPPOINT.filter((item) => { return (item.TRH_SHIP_DATE == fulldate()) }).length : 0})`}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableNativeFeedback>
                                            {menu2 && mappoint.SHOWCALENDARBKAPPOINT && mappoint.SHOWCALENDARBKAPPOINT.filter((item) => { return (item.TRH_SHIP_DATE == fulldate()) }).length > 0 ? <>
                                                {mappoint.SHOWCALENDARBKAPPOINT && mappoint.SHOWCALENDARBKAPPOINT.filter((item) => { return (item.TRH_SHIP_DATE == fulldate()) })
                                                    .map((item) => {
                                                        return (
                                                            <View style={{
                                                                borderBottomColor: 'black',
                                                                borderBottomWidth: 1,

                                                                paddingLeft: 10,
                                                                paddingRight: 10,
                                                                paddingLeft: 10
                                                            }}>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',

                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'รหัสนัดส่ง'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${item.AROE_KEY}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'ชื่อลูกหนี้'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${item.AR_NAME}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'รหัสอ้างอิง'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${item.DI_REF}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'วันที่ยกเลิก'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${safe_Format.dateFormat(item.TRH_CANCEL_DATE)}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'วันที่จัดส่ง'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${safe_Format.dateFormat(item.TRH_SHIP_DATE)}`}</Text>
                                                                </View>
                                                            </View>
                                                        )
                                                    })}
                                            </> : null}
                                            {/* รับชำระ */}
                                            <TouchableNativeFeedback onPress={() => set_menu3(!menu3)}>
                                                <View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: 10

                                                    }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                            {menu3 ? <FontAwesomeIcon name="arrow-down" size={15} color={'black'} style={{ paddingRight: 10 }} /> : <FontAwesomeIcon name="arrow-right" size={15} color={'black'} style={{ paddingRight: 10 }} />}
                                                            <Text style={{ fontSize: FontSize.medium, color: 'black' }}>{`รับชำระ`}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={{ fontSize: FontSize.medium, color: 'black' }}>{`(${rarchqDue.SHOWCALENDARARDUE && rarchqDue.SHOWCALENDARARDUE.filter((item) => { return (item.ARD_DUE_DA == fulldate()) }).length > 0 ? rarchqDue.SHOWCALENDARARDUE.filter((item) => { return (item.ARD_DUE_DA == fulldate()) }).length : 0})`}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableNativeFeedback>
                                            {menu3 && rarchqDue.SHOWCALENDARARDUE && rarchqDue.SHOWCALENDARARDUE.filter((item) => { return (item.ARD_DUE_DA == fulldate()) }).length > 0 ? <>
                                                {rarchqDue.SHOWCALENDARARDUE && rarchqDue.SHOWCALENDARARDUE.filter((item) => { return (item.ARD_DUE_DA == fulldate()) })
                                                    .map((item) => {
                                                        return (
                                                            <View style={{
                                                                borderBottomColor: 'black',
                                                                borderBottomWidth: 1,

                                                                paddingLeft: 10,
                                                                paddingRight: 10,
                                                                paddingLeft: 10
                                                            }}>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',

                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'รหัสรับชำระ'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${item.ARD_KEY}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'ชื่อลูกหนี้'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${item.AR_NAME}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'รหัสอ้างอิง'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${item.DI_REF}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'วันที่ชำระ'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${safe_Format.dateFormat(item.ARD_BIL_DA)}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'วันที่รับชำระ'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${safe_Format.dateFormat(item.ARD_DUE_DA)}`}</Text>
                                                                </View>
                                                            </View>
                                                        )
                                                    })}
                                            </> : null}
                                            {/* จ่ายชำระ */}
                                            <TouchableNativeFeedback onPress={() => set_menu4(!menu4)}>
                                                <View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: 10

                                                    }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                            {menu4 ? <FontAwesomeIcon name="arrow-down" size={15} color={'black'} style={{ paddingRight: 10 }} /> : <FontAwesomeIcon name="arrow-right" size={15} color={'black'} style={{ paddingRight: 10 }} />}
                                                            <Text style={{ fontSize: FontSize.medium, color: 'black' }}>{`จ่ายชำระ`}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={{ fontSize: FontSize.medium, color: 'black' }}>{`(${rapDue.SHOWCALENDARAPDUE && rapDue.SHOWCALENDARAPDUE.filter((item) => { return (item.APD_DUE_DA == fulldate()) }).length > 0 ? rapDue.SHOWCALENDARAPDUE.filter((item) => { return (item.APD_DUE_DA == fulldate()) }).length : 0})`}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableNativeFeedback>
                                            {menu4 && rapDue.SHOWCALENDARAPDUE && rapDue.SHOWCALENDARAPDUE.filter((item) => { return (item.APD_DUE_DA == fulldate()) }).length > 0 ? <>
                                                {rapDue.SHOWCALENDARAPDUE && rapDue.SHOWCALENDARAPDUE.filter((item) => { return (item.APD_DUE_DA == fulldate()) })
                                                    .map((item) => {
                                                        return (
                                                            <View style={{
                                                                borderBottomColor: 'black',
                                                                borderBottomWidth: 1,

                                                                paddingLeft: 10,
                                                                paddingRight: 10,
                                                                paddingLeft: 10
                                                            }}>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',

                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'รหัสรับชำระ'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${item.APD_KEY}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'ชื่อลูกหนี้'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${item.AP_NAME}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'รหัสอ้างอิง'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${item.DI_REF}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'วันที่ชำระ'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${safe_Format.dateFormat(item.APD_BIL_DA)}`}</Text>
                                                                </View>
                                                                <View style={{
                                                                    alignItems: 'center',
                                                                    flexDirection: 'row',
                                                                    paddingBottom: 5
                                                                }}>
                                                                    <Text style={{ width: deviceWidth / 4, color: 'black', }}>{'วันที่รับชำระ'}</Text>
                                                                    <Text style={{ color: 'black', }}>{`${safe_Format.dateFormat(item.APD_DUE_DA)}`}</Text>
                                                                </View>
                                                            </View>
                                                        )
                                                    })}
                                            </> : null}
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

                                    </View>
                                </View>
                            </View>
                        </ScrollView>

                    </ > : <View
                        style={{
                            width: deviceWidth,
                            height: deviceHeight,
                            opacity: 0.5,
                            backgroundColor: null,
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

    },
    image: {
        flex: 1,

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


export default DailyCalendar;
