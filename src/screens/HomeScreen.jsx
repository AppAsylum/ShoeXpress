import {StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, { useRef, useState } from 'react';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../Constants/theme';
import HeaderBar from '../components/HeaderBar';
import ShoeCard from '../components/ShoeCard';



const seacrhIcon = require('../assets/icons/search.png');
const closeIcon = require('../assets/icons/close.png');


const getCategoriesFromData = (data) => {
  let temp = {};
  for (let i = 0; i < data.length; i++) {
    if(temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let catergories = Object.keys(temp);
catergories.unshift('All');
return catergories;
};
const getShoeList = (category, data) => {
  if(category == "All") {
    return data;
  } else {
    let shoeList = data.filter((item) => item.name == category);
    return shoeList
  }
};



const HomeScreen = ({navigation}) => {
const ShoeList = useStore((state) => state.ShoeList);
const addToCart = useStore(state => state.addToCart);
  const calculateCartPrice = useStore(state => state.calculateCartPrice);
const [categories, setCategories] = useState(
  getCategoriesFromData(ShoeList));
const [searchText, setSearchText] = useState('');
const [categoryIndex, setCategoryIndex] = useState({
  index: 1,
  category: categories[1],
});

const windowWidth = Dimensions.get('window').width;

const calculateNumColumns = () => {
  const isPortrait = Dimensions.get('window').height > Dimensions.get('window').width;

  if (isPortrait) {
    return windowWidth < 700 ? 2 : 3;
  } else {
    return windowWidth < 1100 ? 2 : 3; // Adjust the width threshold as needed
  }
};

  const [sortedShoe, setSortedShoe] = useState(
    getShoeList(categoryIndex.category, ShoeList)
    );
  
   
    const listRef = useRef()
  const tabBarHeight = useBottomTabBarHeight();

  const searchShoe = (search) => {
    if(search != '') {
      listRef?.current?.scrollToOffset({
        animated: true,
        offset:0,
      });
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedShoe([
        ...ShoeList.filter((item) => 
      item.name.toLowerCase().includes(search.toLowerCase())
      )]
      );
    }
  }

  const resetSearchShoe = () => {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset:0,
    });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedShoe(
      [...ShoeList]
    );
    setSearchText('')
  }

  const ShoeCardAddToCart =({
    id,
    index,
    name,
    imagelink_square,
    type,
    prices
  }) => {
    addToCart({
      id,
      index,
      name,
      imagelink_square,
      type,
      prices
    });
    calculateCartPrice();
    
  }

  return (

      <SafeAreaView style={styles.screenContainer} edges={['top']}>
        <StatusBar />
          {/* Shoe Flatlist: the screen's only vertical scroller; header content lives in ListHeaderComponent */}
          <FlatList
          ref={listRef}
          keyboardShouldPersistTaps='handled'
          keyboardDismissMode='on-drag'
          ListHeaderComponent={
          <View>
          {/* App Header */}
          <HeaderBar  title='ShoeXpress'/>
          <Text style={styles.screenTitle}>Find the best{'\n'}Shoe for you</Text>

          {/* Search Input */}

          <View style={styles.inputContainerComponent}>
            <TouchableOpacity onPress={() => {
              searchShoe(searchText);
            }}>
              <Image 
              source={seacrhIcon}
              style={{
                height: FONTSIZE.size_18,
                width: FONTSIZE.size_18,
                marginHorizontal: SPACING.space_20
              }}
              tintColor={searchText.length > 0? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
            <TextInput placeholder='Find Your Shoe...'
            value={searchText}
            onChangeText={text =>{
               setSearchText(text)
               searchShoe(text);
              }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInputContainer}
            />
            {searchText.length > 0 ?
            (<TouchableOpacity onPress={() => {
              resetSearchShoe()
            }}>
              <Image 
              source={closeIcon}
              style={{
                height: FONTSIZE.size_14,
                width: FONTSIZE.size_14,
                marginHorizontal: SPACING.space_20,
              }}
              resizeMode='cover'
              tintColor={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity> )
             :( <></>)} 
          </View>

          {/* Category Scroller */}
          <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollViewStyle}
          >
            {categories.map((data, index) => (
              <View
              key={data}
              style={styles.categoryScrollViewContainer}
              >
                <TouchableOpacity 
                style={styles.categoryScrollViewItem} 
                onPress={() => {
                  listRef?.current?.scrollToOffset({
                    animated: true,
                    offset:0,
                  })
                  setCategoryIndex({index: index, category: categories[index]});
                  setSortedShoe([
                    ...getShoeList(categories[index], ShoeList)])
                }}>
                  <Text style={[
                    styles.categoryText, 
                    categoryIndex.index == index
                     ? {color: COLORS.primaryOrangeHex,} : {}]}>{data}</Text>
                  {categoryIndex.index == index ? <View style={styles.activeCategory}/>: <></>}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          </View>
          }
          ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Text style={styles.categoryText}>Shoe Not Found</Text>
          </View>}
          numColumns={calculateNumColumns()}
          showsVerticalScrollIndicator={false}
          data={sortedShoe}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={{paddingBottom: tabBarHeight}}
          keyExtractor={item => item.id} 
          renderItem={({item}) => {
          return (
          <TouchableOpacity
          onPress={() => {
            navigation.push('Details', {
              index: item.index, 
              id: item.id, 
              type: item.type
            });
          }}
          style={styles.cardContainer}>
          <ShoeCard 
          id={item.id}
          name={item.name}
          index={item.index}
          type={item.type}
          imagelink_square={item.imagelink_square}
          average_rating={item.average_rating}
          price={item.prices[2]}
          buttonPressHandler={ShoeCardAddToCart}
      />
    </TouchableOpacity>)
  }}
/>
      </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  inputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15
  },
  categoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20
  },
  categoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15
  },
  categoryScrollViewItem: {
    alignItems: 'center'
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  columnWrapper: {
    justifyContent: 'center',
  },
  emptyListContainer: {
    width:Dimensions.get('window').width - SPACING.space_30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6
 
  },
  cardContainer: {
  margin: 10 
  },
});

