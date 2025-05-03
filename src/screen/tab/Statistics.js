import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Layout from '../../components/Layout';

const Statistics = () => {
  console.log('date', new Date().getDay());

  const today = new Date();

  // Format the date as YYYY-MM-DD
  const formattedDate = today.toISOString().slice(0, 10);
  console.log('formattedDate', formattedDate);

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Bezier Line Chart Example</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
              {
                data: [50, 35, 34, 34, 34, 55, 60],
              },
            ],
          }}
          width={Dimensions.get('window').width - 16} // from react-native
          height={220}
          yAxisLabel="$"
          withShadow={true}
          withInnerLines={false}
          withOuterLines={false}
          yAxisSuffix="k"
          yAxisInterval={3} // optional, defaults to 1
          chartConfig={{
            backgroundGradientFrom: '#FD579A',
            backgroundGradientTo: '#FA5495',
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            fillShadowGradientFrom: '#fff',
            fillShadowGradientFromOpacity: 1,
            fillShadowGradientTo: '#FA5495',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 'bold',
  },
});

export default Statistics;
