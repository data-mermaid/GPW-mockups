const MOBILE_BP = 640; // change this value to adjust the mobile breakpoint

const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    sources: {
      satellite: {
        type: "raster",
        tiles: [
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution:
          "Tiles &copy; Esri &mdash; Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      },
    },
    layers: [{ id: "satellite", type: "raster", source: "satellite" }],
  },
  center: [178.065, -18.142],
  zoom: 8.5,
  maxPitch: 0,
  pitchWithRotate: false,
  touchPitch: false,
  dragRotate: false,
  attributionControl: false,
});

map.addControl(
  new maplibregl.AttributionControl({ compact: true }),
  "bottom-right",
);

map.touchZoomRotate.disableRotation();

// Panel toggle

const panels = [
  { panelId: "panel-left", btnId: "toggle-left" },
  { panelId: "panel-bottom", btnId: "toggle-bottom" },
];

function updatePanel2Position() {
  const p1Hidden = document
    .getElementById("panel-left")
    .classList.contains("hidden");
  if (window.innerWidth <= MOBILE_BP) {
    document.getElementById("panel-bottom").style.left = "";
  } else {
    document.getElementById("panel-bottom").style.left = p1Hidden
      ? "56px"
      : "379px";
  }
}

window.addEventListener("resize", updatePanel2Position);

function showPanel(targetPanelId) {
  panels.forEach(({ panelId, btnId }) => {
    const isTarget = panelId === targetPanelId;
    document.getElementById(panelId).classList.toggle("hidden", !isTarget);
    document.getElementById(btnId).classList.toggle("active", isTarget);
  });
  updatePanel2Position();
}

function hideAll() {
  panels.forEach(({ panelId, btnId }) => {
    document.getElementById(panelId).classList.add("hidden");
    document.getElementById(btnId).classList.remove("active");
  });
  updatePanel2Position();
}

panels.forEach(({ panelId, btnId }) => {
  document.getElementById(btnId).addEventListener("click", function () {
    const alreadyActive = this.classList.contains("active");
    alreadyActive ? hideAll() : showPanel(panelId);
  });
});

// Region breadcrumb

const regionData = [
  {
    label: "Tropical Atlantic",
    countries: [
      "Bahamas",
      "Barbados",
      "Belize",
      "Brazil",
      "Colombia",
      "Costa Rica",
      "Cuba",
      "Dominican Republic",
      "Grenada",
      "Haiti",
      "Honduras",
      "Jamaica",
      "Mexico",
      "Nicaragua",
      "Panama",
      "Trinidad and Tobago",
      "United States",
      "Venezuela",
    ],
  },
  {
    label: "Western Indo-Pacific",
    countries: [
      "Comoros",
      "Djibouti",
      "Egypt",
      "Eritrea",
      "India",
      "Israel",
      "Jordan",
      "Kenya",
      "Madagascar",
      "Maldives",
      "Mauritius",
      "Mozambique",
      "Oman",
      "Saudi Arabia",
      "Seychelles",
      "Somalia",
      "Sri Lanka",
      "Sudan",
      "Tanzania",
      "Yemen",
    ],
  },
  {
    label: "Central Indo-Pacific",
    countries: [
      "Australia",
      "Brunei",
      "China",
      "Indonesia",
      "Japan",
      "Malaysia",
      "Myanmar",
      "Philippines",
      "Singapore",
      "Taiwan",
      "Thailand",
      "Timor-Leste",
      "Vietnam",
    ],
  },
  {
    label: "Eastern Indo-Pacific",
    countries: [
      "Cook Islands",
      "Federated States of Micronesia",
      "Fiji",
      "French Polynesia",
      "Kiribati",
      "Marshall Islands",
      "New Caledonia",
      "Niue",
      "Palau",
      "Papua New Guinea",
      "Samoa",
      "Solomon Islands",
      "Tonga",
      "Tuvalu",
      "Vanuatu",
    ],
  },
  {
    label: "Tropical Eastern Pacific",
    countries: ["Colombia", "Costa Rica", "Ecuador", "Mexico", "Panama"],
  },
];

let bcPath = [{ label: "Global", type: "global" }];

const bcPathEl = document.getElementById("bc-path");
const bcDropdownEl = document.getElementById("bc-dropdown");
const bcChevronEl = document.getElementById("bc-chevron");
const bcControlEl = document.getElementById("bc-control");
const bcSearchEl = document.getElementById("bc-search");
const bcUpLevelEl = document.getElementById("bc-uplevel");

function renderBcPath() {
  bcPathEl.innerHTML = "";
  bcPath.forEach((seg, i) => {
    if (i > 0) {
      const sep = document.createElement("span");
      sep.className = "bc-sep";
      sep.textContent = "›";
      bcPathEl.appendChild(sep);
    }
    const span = document.createElement("span");
    span.className =
      "bc-seg" + (i > 0 && i < bcPath.length - 1 ? " bc-seg-truncatable" : "");
    span.textContent = seg.label;
    if (i < bcPath.length - 1) {
      span.addEventListener("click", () => setBcPath(bcPath.slice(0, i + 1)));
    }
    bcPathEl.appendChild(span);
  });
}

function updateBcUplevel() {
  bcUpLevelEl.disabled = bcPath.length <= 1;
}

const SKELETON_HTML = `<div class="skeleton-wrap">
  <div class="skeleton-card">
    <div class="skeleton skeleton-label"></div>
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-chart"></div>
    <div class="skeleton-legend">
      <div class="skeleton skeleton-legend-item"></div>
      <div class="skeleton skeleton-legend-item"></div>
      <div class="skeleton skeleton-legend-item"></div>
    </div>
  </div>
  <div class="skeleton-card">
    <div class="skeleton skeleton-label"></div>
    <div class="skeleton skeleton-title" style="width:65%"></div>
    <div class="skeleton skeleton-chart"></div>
    <div class="skeleton-legend">
      <div class="skeleton skeleton-legend-item"></div>
      <div class="skeleton skeleton-legend-item"></div>
    </div>
  </div>
</div>`;

let _lastGraphType = null;
let _graphsTimer = null;

function loadGraphs(type) {
  if (type !== null) _lastGraphType = type;

  const contentEl = document.getElementById("panel-bottom-content");
  const icon = document.querySelector("#toggle-bottom .material-icons");

  contentEl.innerHTML = SKELETON_HTML;
  icon.textContent = "sync";
  icon.classList.add("spinning");
  clearTimeout(_graphsTimer);

  _graphsTimer = setTimeout(() => {
    if (_lastGraphType) {
      setPanelBottomGraphs(_lastGraphType);
    } else {
      contentEl.innerHTML =
        '<img src="Wastershed-graphs.png" alt="" style="width:100%;display:block;" />';
    }
    icon.textContent = "bar_chart";
    icon.classList.remove("spinning");
  }, 500);
}

function setBcPath(newPath) {
  bcPath = newPath;
  renderBcPath();
  updateBcUplevel();
  loadGraphs(null);
}

function renderBcDropdown(filter) {
  bcDropdownEl.innerHTML = "";
  const lc = (filter || "").toLowerCase();
  const currentLabel = bcPath[bcPath.length - 1]?.label;

  if (!lc || "global".includes(lc)) {
    const li = document.createElement("li");
    li.className =
      "bc-option bc-group-item-global" +
      (currentLabel === "Global" ? " selected" : "");
    li.textContent = "Global";
    li.addEventListener("mousedown", (e) => {
      e.preventDefault();
      setBcPath([{ label: "Global", type: "global" }]);
      closeBcDropdown();
    });
    bcDropdownEl.appendChild(li);
  }

  regionData.forEach((item) => {
    const regionMatches = !lc || item.label.toLowerCase().includes(lc);
    const matchingCountries = regionMatches
      ? item.countries
      : item.countries.filter((c) => c.toLowerCase().includes(lc));
    if (!regionMatches && matchingCountries.length === 0) return;

    const header = document.createElement("li");
    header.className = "bc-group-header";
    header.textContent = item.label;
    bcDropdownEl.appendChild(header);

    const regionLi = document.createElement("li");
    regionLi.className =
      "bc-option bc-option-region" +
      (currentLabel === item.label ? " selected" : "");
    regionLi.textContent = item.label;
    regionLi.addEventListener("mousedown", (e) => {
      e.preventDefault();
      setBcPath([
        { label: "Global", type: "global" },
        { label: item.label, type: "region" },
      ]);
      closeBcDropdown();
    });
    bcDropdownEl.appendChild(regionLi);

    matchingCountries.forEach((country) => {
      const li = document.createElement("li");
      li.className =
        "bc-option bc-option-country" +
        (currentLabel === country ? " selected" : "");
      li.textContent = country;
      li.addEventListener("mousedown", (e) => {
        e.preventDefault();
        setBcPath([
          { label: "Global", type: "global" },
          { label: item.label, type: "region" },
          { label: country, type: "country" },
        ]);
        closeBcDropdown();
      });
      bcDropdownEl.appendChild(li);
    });
  });
}

function openBcDropdown() {
  bcControlEl.classList.add("open");
  bcDropdownEl.classList.add("open");
  renderBcDropdown("");
  bcSearchEl.value = "";
  bcSearchEl.focus();
}

function closeBcDropdown() {
  bcControlEl.classList.remove("open");
  bcDropdownEl.classList.remove("open");
}

bcChevronEl.addEventListener("click", (e) => {
  e.stopPropagation();
  bcControlEl.classList.contains("open") ? closeBcDropdown() : openBcDropdown();
});

bcSearchEl.addEventListener("input", () => renderBcDropdown(bcSearchEl.value));

bcUpLevelEl.addEventListener("click", () => {
  if (bcPath.length > 1) setBcPath(bcPath.slice(0, -1));
});

// Year selector

document.querySelectorAll(".year-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".year-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Global click — close all dropdowns

document.addEventListener("click", (e) => {
  if (!bcControlEl.contains(e.target)) closeBcDropdown();
  if (
    !document.getElementById("hamburger").contains(e.target) &&
    !document.getElementById("nav-dropdown").contains(e.target)
  ) {
    document.getElementById("nav-dropdown").classList.remove("open");
    document.getElementById("hamburger").setAttribute("aria-expanded", false);
  }
});

// Map click: add Watershed breadcrumb and show land/water graphs in panel-left

map.on("click", (e) => {
  const oceanFeatures = map.queryRenderedFeatures(e.point, {
    layers: ["ocean-detect"],
  });
  const type = oceanFeatures.length > 0 ? "water" : "land";
  const label = type === "water" ? "Dispersal" : "Watershed";

  // Ensure path has Global > Region > Country before appending Watershed/Plume
  let base = bcPath;
  if (base.length === 1) {
    base = [
      { label: "Global", type: "global" },
      { label: "Eastern Indo-Pacific", type: "region" },
      { label: "Fiji", type: "country" },
    ];
  } else if (base.length === 2 && base[1].type === "region") {
    const regionItem = regionData.find((r) => r.label === base[1].label);
    const country = regionItem?.countries[0] ?? "Fiji";
    base = [...base, { label: country, type: "country" }];
  } else if (base.length === 2 && base[1].type === "country") {
    const regionItem = regionData.find((r) =>
      r.countries.includes(base[1].label),
    );
    const region = regionItem?.label ?? "Eastern Indo-Pacific";
    base = [base[0], { label: region, type: "region" }, base[1]];
  }

  // Set graph type before setBcPath so loadGraphs(null) inside picks it up
  _lastGraphType = type;
  setBcPath([...base.slice(0, 3), { label, type: label.toLowerCase() }]);
});

// Geo lookup control

class GeoLookupControl {
  onAdd(map) {
    this._map = map;
    this._visible = false;

    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl maplibregl-ctrl-group";

    this._btn = document.createElement("button");
    this._btn.title = "Search location";
    this._btn.innerHTML =
      '<span class="material-icons" style="font-size:18px;line-height:29px">travel_explore</span>';
    this._btn.addEventListener("click", (e) => {
      e.stopPropagation();
      this._toggle();
    });
    this._container.appendChild(this._btn);

    return this._container;
  }

  onRemove() {
    this._container.parentNode?.removeChild(this._container);
    this._popup?.remove();
    this._map = undefined;
  }

  _toggle() {
    this._visible ? this._hide() : this._show();
  }

  _show() {
    this._visible = true;
    if (!this._popup) {
      this._popup = document.createElement("div");
      this._popup.id = "geo-lookup-popup";
      this._popup.innerHTML = `
        <input id="geo-lookup-input" type="text" placeholder="Address, country, or lat, lon" />
        <button id="geo-lookup-go">Go</button>
        <div id="geo-lookup-error"></div>
      `;
      document.body.appendChild(this._popup);
      document
        .getElementById("geo-lookup-go")
        .addEventListener("click", () => this._search());
      document
        .getElementById("geo-lookup-input")
        .addEventListener("keydown", (e) => {
          if (e.key === "Enter") this._search();
          if (e.key === "Escape") this._hide();
        });
      document.addEventListener("click", (e) => {
        if (
          this._visible &&
          !this._container.contains(e.target) &&
          !this._popup.contains(e.target)
        ) {
          this._hide();
        }
      });
    }

    const rect = this._btn.getBoundingClientRect();
    this._popup.style.right = window.innerWidth - rect.left + 6 + "px";
    this._popup.style.bottom = window.innerHeight - rect.bottom + "px";
    this._popup.classList.remove("geo-lookup-hidden");
    document.getElementById("geo-lookup-input").focus();
  }

  _hide() {
    this._visible = false;
    this._popup?.classList.add("geo-lookup-hidden");
  }

  async _search() {
    const input = document.getElementById("geo-lookup-input");
    const errorEl = document.getElementById("geo-lookup-error");
    const query = input.value.trim();
    if (!query) return;
    errorEl.textContent = "";

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
        { headers: { "Accept-Language": "en" } },
      );
      const data = await res.json();
      if (data.length) {
        this._map.flyTo({
          center: [parseFloat(data[0].lon), parseFloat(data[0].lat)],
          zoom: 8,
        });
        this._hide();
      } else {
        errorEl.textContent = "No results found.";
      }
    } catch {
      errorEl.textContent = "Search failed.";
    }
  }
}

// Graph images for panel-left (land vs water click)

const PANEL_BOTTOM_GRAPHS = {
  land: ["Wastershed-graphs.png"],
  water: ["dispersal-graphs.png"],
};

function setPanelBottomGraphs(type) {
  const el = document.getElementById("panel-bottom-content");
  el.innerHTML = PANEL_BOTTOM_GRAPHS[type]
    .map(
      (src) => `<img src="${src}" alt="" style="width:100%;display:block;" />`,
    )
    .join("");
}

map.on("load", () => {
  // Invisible ocean polygons used only for land/water hit detection
  map.addSource("ocean", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_ocean.geojson",
  });
  map.addLayer({
    id: "ocean-detect",
    type: "fill",
    source: "ocean",
    paint: { "fill-color": "#0000ff", "fill-opacity": 0 },
  });

  map.addControl(new GeoLookupControl(), "bottom-right");
  map.addControl(new maplibregl.GeolocateControl(), "bottom-right");
  map.addControl(
    new maplibregl.NavigationControl({ showCompass: false }),
    "bottom-right",
  );
  updateScaleBar();
});

map.on("zoom", updateScaleBar);
map.on("move", updateScaleBar);

// Scale bar

const scaleBarEl = document.getElementById("scale-bar");
const scaleLabelEl = document.getElementById("scale-label");

function updateScaleBar() {
  const lat = map.getCenter().lat;
  const zoom = map.getZoom();
  const metersPerPx =
    (40075016.686 * Math.cos((lat * Math.PI) / 180)) /
    (256 * Math.pow(2, zoom));
  const targetMeters = metersPerPx * 100;
  const steps = [
    1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000,
    100000, 200000, 500000, 1000000, 2000000, 5000000,
  ];
  let niceDist = steps[0];
  for (const s of steps) {
    if (s <= targetMeters) niceDist = s;
    else break;
  }
  scaleBarEl.style.width = Math.round(niceDist / metersPerPx) + "px";
  scaleLabelEl.textContent =
    niceDist >= 1000 ? niceDist / 1000 + " km" : niceDist + " m";
}

// Cursor coordinates

const coordsEl = document.getElementById("coords");

map.on("mousemove", (e) => {
  const { lng, lat } = e.lngLat;
  coordsEl.textContent = `Lat: ${lat.toFixed(5)}  Lon: ${lng.toFixed(5)}`;
});

map.on("mouseleave", () => {
  coordsEl.textContent = "—";
});

// Hamburger menu

const hamburger = document.getElementById("hamburger");
const navDropdown = document.getElementById("nav-dropdown");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = navDropdown.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", isOpen);
});

// Tooltips

const tooltipEl = document.createElement("div");
tooltipEl.id = "mui-tooltip";
document.body.appendChild(tooltipEl);
let _tooltipTimer = null;

document.querySelectorAll("[data-tooltip]").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    clearTimeout(_tooltipTimer);
    _tooltipTimer = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const placement = el.dataset.tooltipPlacement || "right";
      tooltipEl.textContent = el.dataset.tooltip;
      tooltipEl.style.display = "block";
      if (placement === "right") {
        tooltipEl.style.left = rect.right + 8 + "px";
        tooltipEl.style.top = rect.top + rect.height / 2 + "px";
        tooltipEl.style.transform = "translateY(-50%)";
      } else {
        tooltipEl.style.left = rect.left + rect.width / 2 + "px";
        tooltipEl.style.top = rect.bottom + 8 + "px";
        tooltipEl.style.transform = "translateX(-50%)";
      }
    }, 200);
  });
  el.addEventListener("mouseleave", () => {
    clearTimeout(_tooltipTimer);
    tooltipEl.style.display = "none";
  });
});

// Init

renderBcPath();
updateBcUplevel();
if (window.innerWidth > MOBILE_BP) showPanel("panel-bottom");
else hideAll();
