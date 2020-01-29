export const clusterLayer= {
  id: 'clusters',
  type: 'circle',
  // source: props.data,
  filter: ['has', 'aqi'],
  paint: {
    'circle-color': ['step', ['to-number', ['get', 'aqi']], 'green', 25, '#88DB57', 50, '#FFF072', 75, 'yellow', 100, 'darkorange', 200, 'red', 300, 'darkred'],  
    'circle-radius': 11    
  }
};

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  // source: props.data,
  filter: ['has', 'aqi'],
  layout: {
    'text-field': '{aqi}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 11
  }
};


