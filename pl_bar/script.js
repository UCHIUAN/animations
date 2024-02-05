export default async function main({ $, gsap: { tl }, properties, id }) {
  const container = $("#bar");
  container.id = id;

  const style = container.style;
  style.marginLeft = `${properties.leftBoundary}px`;
  style.width = `${properties.expand == "horizontal" ? 0 : properties.rightBoundary}px`;
  style.marginTop = `${properties.topBoundary}px`;
  style.height = `${properties.expand == "vertical" ? 0 : properties.bottomBoundary}px`;
  style.fontFamily = properties.fontFamily;
  style.fontWeight = properties.fontWeight;
  style.fontSize = `${properties.fontSize}px`;
  style.color = properties.fontColor;
  style.textAlign = properties.fontAlign;
  style.opacity = properties.startOpacity;

  style.position = "relative";
  style.display = "flex";
  style.flexWrap = "wrap";
  style.visibility = "hidden";

  const segments = properties.segments;

  const min = properties.leftScore1;
  const max= properties[`rightScore${segments}`]

  const totalRange = max - min;

  const sizeBoxes = (index) => {
    if (properties.autoScale) {
      return (1 / segments) * 100;
    } else {
      const left = properties[`leftScore${index}`];
      const right = index < segments ? properties[`leftScore${index+1}`]: max;
      const segmentRange = (right-left);
      const width = (segmentRange/totalRange)* 100;
      return width;
    }
  };

  const dividerWidth = (isBold) => {
    if (properties.dividerRightIsPresent && properties.dividerLeftIsPresent) {
      return isBold ? 2 : 1;
    } else {
      return isBold ? 4 : 2;
    }
  };

  const getOrder = (index, row) => {
    return index + segments * row;
  };

  for (var i = 0; i < segments; i++) {
    var div = document.createElement("div");
    div.style.height =
      properties.hasText ? "50%" : "100%";
    div.style.position = "relative";
    div.style.backgroundColor = properties[`barColor${i + 1}`];
    div.style.flexBasis = `${sizeBoxes(i + 1)}%`;
    div.style.order = getOrder(i + 1, 1);
    div.style.border = properties.boxDividers ? "1px solid white" : 0;

    container.appendChild(div);

    var scoreDivLeft = document.createElement("div");
    scoreDivLeft.innerText = properties[`leftScore${i + 1}`] ?? "";
    scoreDivLeft.style.flexBasis = `${sizeBoxes(i + 1) / 2}%`;
    scoreDivLeft.style.order = getOrder(i + 1, 10);
    scoreDivLeft.style.fontSize = `${
      properties[`leftScoreFontSize${i + 1}`]
    }px`;
    scoreDivLeft.style.fontFamily = properties[`leftScoreFontFamily${i + 1}`];
    scoreDivLeft.style.color = properties[`leftScoreFontColor${i + 1}`];
    scoreDivLeft.style.textAlign = "left";
    scoreDivLeft.style.paddingLeft = "2px";

    var scoreDivRight = document.createElement("div");
    scoreDivRight.innerText = properties[`rightScore${i + 1}`] ?? "";
    scoreDivRight.style.flexBasis = `${sizeBoxes(i + 1) / 2}%`;
    scoreDivRight.style.order = getOrder(i + 2, 10);
    scoreDivRight.style.fontSize = `${
      properties[`rightScoreFontSize${i + 1}`]
    }px`;
    scoreDivRight.style.fontFamily = properties[`rightScoreFontFamily${i + 1}`];
    scoreDivRight.style.color = properties[`rightScoreFontColor${i + 1}`];
    scoreDivRight.style.textAlign = "right";
    scoreDivRight.style.paddingRight = "2px";

    var titleDiv = document.createElement("div");
    titleDiv.innerText = properties[`titleText${i + 1}`] ?? "";
    titleDiv.style.flexBasis = `${sizeBoxes(i + 1)}%`;
    titleDiv.style.order = getOrder(i + 1, 100);
    titleDiv.style.fontSize = `${properties[`titleFontSize${i + 1}`]}px`;
    titleDiv.style.fontFamily = properties[`titleFontFamily${i + 1}`];
    titleDiv.style.color = properties[`titleFontColor${i + 1}`];

    var descriptionDiv = document.createElement("div");
    descriptionDiv.innerText = properties[`descriptionText${i + 1}`] ?? "";
    descriptionDiv.style.flexBasis = `${sizeBoxes(i + 1)}%`;
    descriptionDiv.style.order = getOrder(i + 1, 1000);
    descriptionDiv.style.fontSize = `${
      properties[`descriptionFontSize${i + 1}`]
    }px`;
    descriptionDiv.style.fontFamily =
      properties[`descriptionFontFamily${i + 1}`];
    descriptionDiv.style.color = properties[`descriptionFontColor${i + 1}`];

    if (properties.dividerLeftIsPresent) {
      scoreDivLeft.style.borderLeft = `${dividerWidth(
        properties.dividerLeftBold
      )}px solid ${properties.dividerRightColor}`;

      titleDiv.style.borderLeft = `${dividerWidth(
        properties.dividerLeftBold
      )}px solid ${properties.dividerLeftColor}`;
    }

    if (properties.dividerRightIsPresent) {


      scoreDivRight.style.borderRight = `${dividerWidth(
        properties.dividerLeftBold
      )}px solid ${properties.dividerLeftColor}`;

      titleDiv.style.borderRight = `${dividerWidth(
        properties.dividerLeftBold
      )}px solid ${properties.dividerRightColor}`;
    }
    if (properties.hasText) {
      container.appendChild(titleDiv);
      container.appendChild(descriptionDiv);
      container.appendChild(scoreDivLeft);
      container.appendChild(scoreDivRight);
    }
  }

  tl.to($(`#${id}`), {
    opacity: properties.baseOpacity,
    width: properties.rightBoundary,
    height: properties.bottomBoundary,
    duration: properties.fadeInDuration ?? 1,
    visibility: "visible",
  });
}

export function fadeOut({ $, gsap: { tl }, properties, id }) {
  tl.to($(`#${id}`), {
    opacity: properties.endOpacity,
    duration: properties.fadeOutDuration ?? 1,
  });
}

//TODO
/*
Future anims: 
Bar shift
Bar manipulation (change height)
Highlighting
*/