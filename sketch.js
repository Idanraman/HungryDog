var x = new Array(3);
var y = new Array(3);
var me = new Array(3);
var mymove = new Array(2);
var him = new Array(2);
var segLength = 18;
var win = 0;

function setup() {
  createCanvas(640, 600);
  strokeWeight(1);
  stroke(255, 100);
  for (var i = 0; i < x.length; i++) {
    x[i] = 0;
    y[i] = 0;
  }
  center = 300;
  rad = 200;
  me = [center, center, 0];
  him = 0;
  h_speed = 360 / ((2 * PI * rad) / 4);
}

function draw() {
  if (win == 1) {
    background(2, 100, 2);
  } else if (win == -1) {
    background(100, 2, 2);
  } else {
    background(0);
  }
  fill(255, 255, 255);
  circle(center, center, rad);

  fill(0, 0, 0);
  circle(me[0], me[1], 5);

  my_ang = myangelo(me[0], me[1]);

  fill(100, 0, 0);
  circle(center + (rad + 5) * sin(radians(him)), center + (rad + 5) * cos(radians(him)), 5);


  if (him < my_ang) {
    if (abs(him - my_ang) < 180)
      him += h_speed;
    else him -= h_speed;
  } else {
    if (abs(him - my_ang) < 180)
      him -= h_speed;
    else him += h_speed;
  }

  if (keyIsDown(ENTER)) {
    setup();
  }

  if (keyIsDown(LEFT_ARROW)) {
    me[2] += 5;
  } else if (keyIsDown(RIGHT_ARROW)) {
    me[2] -= 5;
  }

  him = (him + 360) % 360
  me[2] = me[2] % 360

  me[1] += 1 * cos(radians(me[2]))
  me[0] += 1 * sin(radians(me[2]))

  if (distance(me[0], me[1]) < rad) {
    win = 0
  }
  if (win == 0) {

    if (distance(me[0], me[1]) > rad + 5 && abs(him - my_ang) > h_speed + 1 && abs(him - my_ang) < 350) {
      win = 1
    }
    if (distance(me[0], me[1]) > rad + 5 && (abs(him - my_ang) <= h_speed + 1 || abs(him - my_ang) > 350)) {
      win = -1
    }
  }

}

function distance(x, y) {
  return (sqrt((x - center) ** 2 + (y - center) ** 2))
}

function myangelo() {
  ans = atan((center - me[0]) / (center - me[1]));
  if ((center - me[1]) >= 0) {
    ans += radians(180)
  }

  if ((center - me[1]) < 0 && (center - me[0]) > 0) {
    ans += radians(360)
  }
  if ((center - me[1]) == 0 && (center - me[0]) == 0) {
    ans = 0
  }
  return (degrees(ans));
}