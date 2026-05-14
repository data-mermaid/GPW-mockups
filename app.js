const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      satellite: {
        type: 'raster',
        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256,
        attribution: 'Tiles &copy; Esri &mdash; Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      },
    },
    layers: [{ id: 'satellite', type: 'raster', source: 'satellite' }],
  },
  center: [178.065, -18.142],
  zoom: 8.5,
  maxPitch: 0,
  pitchWithRotate: false,
  touchPitch: false,
  dragRotate: false,
});

map.touchZoomRotate.disableRotation();


// Panel toggle

const panels = [
  { panelId: 'panel-left',   btnId: 'toggle-left' },
  { panelId: 'panel-bottom', btnId: 'toggle-bottom' },
];

function updatePanel2Position() {
  const p1Hidden = document.getElementById('panel-left').classList.contains('hidden');
  document.getElementById('panel-bottom').style.left = p1Hidden ? '56px' : '324px';
}

function showPanel(targetPanelId) {
  panels.forEach(({ panelId, btnId }) => {
    const isTarget = panelId === targetPanelId;
    document.getElementById(panelId).classList.toggle('hidden', !isTarget);
    document.getElementById(btnId).classList.toggle('active', isTarget);
  });
  updatePanel2Position();
}

function hideAll() {
  panels.forEach(({ panelId, btnId }) => {
    document.getElementById(panelId).classList.add('hidden');
    document.getElementById(btnId).classList.remove('active');
  });
  updatePanel2Position();
}

panels.forEach(({ panelId, btnId }) => {
  document.getElementById(btnId).addEventListener('click', function () {
    const alreadyActive = this.classList.contains('active');
    alreadyActive ? hideAll() : showPanel(panelId);
  });
});


// Region breadcrumb

const regionOptions = [
  { group: 'Global', label: 'Global' },
  { group: 'Countries with Coral Reefs', label: 'Australia' },
  { group: 'Countries with Coral Reefs', label: 'Bahamas' },
  { group: 'Countries with Coral Reefs', label: 'Barbados' },
  { group: 'Countries with Coral Reefs', label: 'Belize' },
  { group: 'Countries with Coral Reefs', label: 'Brazil' },
  { group: 'Countries with Coral Reefs', label: 'Brunei' },
  { group: 'Countries with Coral Reefs', label: 'China' },
  { group: 'Countries with Coral Reefs', label: 'Colombia' },
  { group: 'Countries with Coral Reefs', label: 'Comoros' },
  { group: 'Countries with Coral Reefs', label: 'Cook Islands' },
  { group: 'Countries with Coral Reefs', label: 'Costa Rica' },
  { group: 'Countries with Coral Reefs', label: 'Cuba' },
  { group: 'Countries with Coral Reefs', label: 'Djibouti' },
  { group: 'Countries with Coral Reefs', label: 'Dominican Republic' },
  { group: 'Countries with Coral Reefs', label: 'Ecuador' },
  { group: 'Countries with Coral Reefs', label: 'Egypt' },
  { group: 'Countries with Coral Reefs', label: 'Eritrea' },
  { group: 'Countries with Coral Reefs', label: 'Federated States of Micronesia' },
  { group: 'Countries with Coral Reefs', label: 'Fiji' },
  { group: 'Countries with Coral Reefs', label: 'French Polynesia' },
  { group: 'Countries with Coral Reefs', label: 'Grenada' },
  { group: 'Countries with Coral Reefs', label: 'Haiti' },
  { group: 'Countries with Coral Reefs', label: 'Honduras' },
  { group: 'Countries with Coral Reefs', label: 'India' },
  { group: 'Countries with Coral Reefs', label: 'Indonesia' },
  { group: 'Countries with Coral Reefs', label: 'Israel' },
  { group: 'Countries with Coral Reefs', label: 'Jamaica' },
  { group: 'Countries with Coral Reefs', label: 'Japan' },
  { group: 'Countries with Coral Reefs', label: 'Jordan' },
  { group: 'Countries with Coral Reefs', label: 'Kenya' },
  { group: 'Countries with Coral Reefs', label: 'Kiribati' },
  { group: 'Countries with Coral Reefs', label: 'Madagascar' },
  { group: 'Countries with Coral Reefs', label: 'Malaysia' },
  { group: 'Countries with Coral Reefs', label: 'Maldives' },
  { group: 'Countries with Coral Reefs', label: 'Marshall Islands' },
  { group: 'Countries with Coral Reefs', label: 'Mauritius' },
  { group: 'Countries with Coral Reefs', label: 'Mexico' },
  { group: 'Countries with Coral Reefs', label: 'Mozambique' },
  { group: 'Countries with Coral Reefs', label: 'Myanmar' },
  { group: 'Countries with Coral Reefs', label: 'New Caledonia' },
  { group: 'Countries with Coral Reefs', label: 'Nicaragua' },
  { group: 'Countries with Coral Reefs', label: 'Niue' },
  { group: 'Countries with Coral Reefs', label: 'Oman' },
  { group: 'Countries with Coral Reefs', label: 'Palau' },
  { group: 'Countries with Coral Reefs', label: 'Panama' },
  { group: 'Countries with Coral Reefs', label: 'Papua New Guinea' },
  { group: 'Countries with Coral Reefs', label: 'Philippines' },
  { group: 'Countries with Coral Reefs', label: 'Samoa' },
  { group: 'Countries with Coral Reefs', label: 'Saudi Arabia' },
  { group: 'Countries with Coral Reefs', label: 'Seychelles' },
  { group: 'Countries with Coral Reefs', label: 'Singapore' },
  { group: 'Countries with Coral Reefs', label: 'Solomon Islands' },
  { group: 'Countries with Coral Reefs', label: 'Somalia' },
  { group: 'Countries with Coral Reefs', label: 'Sri Lanka' },
  { group: 'Countries with Coral Reefs', label: 'Sudan' },
  { group: 'Countries with Coral Reefs', label: 'Taiwan' },
  { group: 'Countries with Coral Reefs', label: 'Tanzania' },
  { group: 'Countries with Coral Reefs', label: 'Thailand' },
  { group: 'Countries with Coral Reefs', label: 'Timor-Leste' },
  { group: 'Countries with Coral Reefs', label: 'Tonga' },
  { group: 'Countries with Coral Reefs', label: 'Trinidad and Tobago' },
  { group: 'Countries with Coral Reefs', label: 'Tuvalu' },
  { group: 'Countries with Coral Reefs', label: 'United States' },
  { group: 'Countries with Coral Reefs', label: 'Vanuatu' },
  { group: 'Countries with Coral Reefs', label: 'Venezuela' },
  { group: 'Countries with Coral Reefs', label: 'Vietnam' },
  { group: 'Countries with Coral Reefs', label: 'Yemen' },
  { group: 'Regions with Coral Reefs', label: 'Tropical Atlantic' },
  { group: 'Regions with Coral Reefs', label: 'Western Indo-Pacific' },
  { group: 'Regions with Coral Reefs', label: 'Central Indo-Pacific' },
  { group: 'Regions with Coral Reefs', label: 'Eastern Indo-Pacific' },
  { group: 'Regions with Coral Reefs', label: 'Tropical Eastern Pacific' },
];

let bcPath = [{ label: 'Global', type: 'global' }];

const bcPathEl     = document.getElementById('bc-path');
const bcDropdownEl = document.getElementById('bc-dropdown');
const bcChevronEl  = document.getElementById('bc-chevron');
const bcControlEl  = document.getElementById('bc-control');
const bcSearchEl   = document.getElementById('bc-search');
const bcUpLevelEl  = document.getElementById('bc-uplevel');

function renderBcPath() {
  bcPathEl.innerHTML = '';
  bcPath.forEach((seg, i) => {
    if (i > 0) {
      const sep = document.createElement('span');
      sep.className = 'bc-sep';
      sep.textContent = '›';
      bcPathEl.appendChild(sep);
    }
    const span = document.createElement('span');
    span.className = 'bc-seg';
    span.textContent = seg.label;
    if (i < bcPath.length - 1) {
      span.addEventListener('click', () => setBcPath(bcPath.slice(0, i + 1)));
    }
    bcPathEl.appendChild(span);
  });
}

function updateBcUplevel() {
  bcUpLevelEl.disabled = bcPath.length <= 1;
}

let _loadingTimer = null;
function triggerBcLoading() {
  const icon = document.querySelector('#toggle-bottom .material-icons');
  icon.textContent = 'sync';
  icon.classList.add('spinning');
  clearTimeout(_loadingTimer);
  _loadingTimer = setTimeout(() => {
    icon.textContent = 'bar_chart';
    icon.classList.remove('spinning');
  }, 600);
}

function setBcPath(newPath) {
  bcPath = newPath;
  renderBcPath();
  updateBcUplevel();
  triggerBcLoading();
}

function renderBcDropdown(filter) {
  bcDropdownEl.innerHTML = '';
  const lc = (filter || '').toLowerCase();
  let currentGroup = null;
  regionOptions.forEach(opt => {
    if (lc && !opt.label.toLowerCase().includes(lc) && !opt.group.toLowerCase().includes(lc)) return;
    if (opt.group !== currentGroup) {
      currentGroup = opt.group;
      const header = document.createElement('li');
      header.className = 'bc-group-header';
      header.textContent = currentGroup;
      bcDropdownEl.appendChild(header);
    }
    const li = document.createElement('li');
    li.className = 'bc-option' + (opt.label === 'Global' ? ' bc-group-item-global' : '');
    if (opt.label === bcPath[bcPath.length - 1]?.label) li.classList.add('selected');
    li.textContent = opt.label;
    li.addEventListener('mousedown', (e) => {
      e.preventDefault();
      setBcPath(opt.label === 'Global'
        ? [{ label: 'Global', type: 'global' }]
        : [{ label: 'Global', type: 'global' }, { label: opt.label, type: opt.group === 'Regions with Coral Reefs' ? 'region' : 'country' }]);
      closeBcDropdown();
    });
    bcDropdownEl.appendChild(li);
  });
}

function openBcDropdown() {
  bcControlEl.classList.add('open');
  bcDropdownEl.classList.add('open');
  renderBcDropdown('');
  bcSearchEl.value = '';
  bcSearchEl.focus();
}

function closeBcDropdown() {
  bcControlEl.classList.remove('open');
  bcDropdownEl.classList.remove('open');
}

bcChevronEl.addEventListener('click', (e) => {
  e.stopPropagation();
  bcControlEl.classList.contains('open') ? closeBcDropdown() : openBcDropdown();
});

bcSearchEl.addEventListener('input', () => renderBcDropdown(bcSearchEl.value));

bcUpLevelEl.addEventListener('click', () => {
  if (bcPath.length > 1) setBcPath(bcPath.slice(0, -1));
});


// Year selector

const yearDisplayEl  = document.getElementById('bc-year-display');
const yearDropdownEl = document.getElementById('bc-year-dropdown');
const yearChevronEl  = document.getElementById('bc-year-chevron');

yearDropdownEl.querySelectorAll('.bc-option').forEach(li => {
  if (li.textContent === '2025') li.classList.add('selected');
  li.addEventListener('mousedown', (e) => {
    e.preventDefault();
    yearDropdownEl.querySelectorAll('.bc-option').forEach(o => o.classList.remove('selected'));
    li.classList.add('selected');
    yearDisplayEl.textContent = li.textContent;
    yearDropdownEl.classList.remove('open');
  });
});

yearChevronEl.addEventListener('click', (e) => {
  e.stopPropagation();
  yearDropdownEl.classList.toggle('open');
});


// Global click — close all dropdowns

document.addEventListener('click', (e) => {
  if (!bcControlEl.contains(e.target)) closeBcDropdown();
  if (!document.getElementById('bc-year').contains(e.target)) yearDropdownEl.classList.remove('open');
  if (!document.getElementById('hamburger').contains(e.target) && !document.getElementById('nav-dropdown').contains(e.target)) {
    document.getElementById('nav-dropdown').classList.remove('open');
    document.getElementById('hamburger').setAttribute('aria-expanded', false);
  }
});


// Map click adds Watershed when at country/region level

map.on('click', () => {
  if (bcPath.length === 2) setBcPath([...bcPath, { label: 'Watershed', type: 'watershed' }]);
});


// Geo lookup control

class GeoLookupControl {
  onAdd(map) {
    this._map = map;
    this._visible = false;

    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';

    this._btn = document.createElement('button');
    this._btn.title = 'Search location';
    this._btn.innerHTML = '<span class="material-icons" style="font-size:18px;line-height:29px">travel_explore</span>';
    this._btn.addEventListener('click', (e) => { e.stopPropagation(); this._toggle(); });
    this._container.appendChild(this._btn);

    return this._container;
  }

  onRemove() {
    this._container.parentNode?.removeChild(this._container);
    this._popup?.remove();
    this._map = undefined;
  }

  _toggle() { this._visible ? this._hide() : this._show(); }

  _show() {
    this._visible = true;
    if (!this._popup) {
      this._popup = document.createElement('div');
      this._popup.id = 'geo-lookup-popup';
      this._popup.innerHTML = `
        <input id="geo-lookup-input" type="text" placeholder="Address, country, or lat, lon" />
        <button id="geo-lookup-go">Go</button>
        <div id="geo-lookup-error"></div>
      `;
      document.body.appendChild(this._popup);
      document.getElementById('geo-lookup-go').addEventListener('click', () => this._search());
      document.getElementById('geo-lookup-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this._search();
        if (e.key === 'Escape') this._hide();
      });
      document.addEventListener('click', (e) => {
        if (this._visible && !this._container.contains(e.target) && !this._popup.contains(e.target)) {
          this._hide();
        }
      });
    }

    const rect = this._btn.getBoundingClientRect();
    this._popup.style.right = (window.innerWidth - rect.left + 6) + 'px';
    this._popup.style.bottom = (window.innerHeight - rect.bottom) + 'px';
    this._popup.classList.remove('geo-lookup-hidden');
    document.getElementById('geo-lookup-input').focus();
  }

  _hide() {
    this._visible = false;
    this._popup?.classList.add('geo-lookup-hidden');
  }

  async _search() {
    const input = document.getElementById('geo-lookup-input');
    const errorEl = document.getElementById('geo-lookup-error');
    const query = input.value.trim();
    if (!query) return;
    errorEl.textContent = '';

    const latLon = query.match(/^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/);
    if (latLon) {
      const lat = parseFloat(latLon[1]);
      const lon = parseFloat(latLon[2]);
      if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
        this._map.flyTo({ center: [lon, lat], zoom: 8 });
        this._hide();
        return;
      }
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      if (data.length) {
        this._map.flyTo({ center: [parseFloat(data[0].lon), parseFloat(data[0].lat)], zoom: 8 });
        this._hide();
      } else {
        errorEl.textContent = 'No results found.';
      }
    } catch {
      errorEl.textContent = 'Search failed.';
    }
  }
}

map.on('load', () => {
  map.addControl(new GeoLookupControl(), 'bottom-right');
  map.addControl(new maplibregl.GeolocateControl(), 'bottom-right');
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
  updateScaleBar();
});

map.on('zoom', updateScaleBar);
map.on('move', updateScaleBar);


// Scale bar

const scaleBarEl   = document.getElementById('scale-bar');
const scaleLabelEl = document.getElementById('scale-label');

function updateScaleBar() {
  const lat = map.getCenter().lat;
  const zoom = map.getZoom();
  const metersPerPx = (40075016.686 * Math.cos(lat * Math.PI / 180)) / (256 * Math.pow(2, zoom));
  const targetMeters = metersPerPx * 100;
  const steps = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000];
  let niceDist = steps[0];
  for (const s of steps) { if (s <= targetMeters) niceDist = s; else break; }
  scaleBarEl.style.width = Math.round(niceDist / metersPerPx) + 'px';
  scaleLabelEl.textContent = niceDist >= 1000 ? (niceDist / 1000) + ' km' : niceDist + ' m';
}


// Cursor coordinates

const coordsEl = document.getElementById('coords');

map.on('mousemove', (e) => {
  const { lng, lat } = e.lngLat;
  coordsEl.textContent = `Lat: ${lat.toFixed(5)}  Lon: ${lng.toFixed(5)}`;
});

map.on('mouseleave', () => {
  coordsEl.textContent = '—';
});


// Hamburger menu

const hamburger   = document.getElementById('hamburger');
const navDropdown = document.getElementById('nav-dropdown');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = navDropdown.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});


// Tooltips

const tooltipEl = document.createElement('div');
tooltipEl.id = 'mui-tooltip';
document.body.appendChild(tooltipEl);
let _tooltipTimer = null;

document.querySelectorAll('[data-tooltip]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    clearTimeout(_tooltipTimer);
    _tooltipTimer = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const placement = el.dataset.tooltipPlacement || 'right';
      tooltipEl.textContent = el.dataset.tooltip;
      tooltipEl.style.display = 'block';
      if (placement === 'right') {
        tooltipEl.style.left  = (rect.right + 8) + 'px';
        tooltipEl.style.top   = (rect.top + rect.height / 2) + 'px';
        tooltipEl.style.transform = 'translateY(-50%)';
      } else {
        tooltipEl.style.left  = (rect.left + rect.width / 2) + 'px';
        tooltipEl.style.top   = (rect.bottom + 8) + 'px';
        tooltipEl.style.transform = 'translateX(-50%)';
      }
    }, 200);
  });
  el.addEventListener('mouseleave', () => {
    clearTimeout(_tooltipTimer);
    tooltipEl.style.display = 'none';
  });
});


// Init

renderBcPath();
updateBcUplevel();
showPanel('panel-bottom');
