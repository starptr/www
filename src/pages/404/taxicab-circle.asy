unitsize(1.5cm);
defaultpen(fontsize(24pt));
pen p = linewidth(2);
draw((0,3)--(3,0), p);
draw((0,-3)--(3,0), p);
draw((0,-3)--(-3,0), p);
draw((0,3)--(-3,0), p);

draw((-4,0)--(4,0),Arrow);
draw((0,-4)--(0,4),Arrow);

label("$x$",(4,0),NW*1.5);
label("$y$",(0,4),SW*1.5);
