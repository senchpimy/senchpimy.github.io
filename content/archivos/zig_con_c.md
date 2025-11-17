---
title: "owncloud"
date: "2024-05-04"
---

# Zig 
Zig es un "nuevo" lenguaje de programación que se enfoca en ser lo más compatible con C como sea posible, pero teniendo una sintaxis y ecosistema
moderno, para probarlo cree este programa que crea una ventana usando la librería "Xlib" que está totalmente escrita en C.

Este es el código en C:

```c
#include <X11/Xlib.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
  Display *d;
  Window w;
  XEvent e;
  const char *msg = "EXAMPLE";
  int s;

  d = XOpenDisplay(NULL);
  if (d == NULL) {
    fprintf(stderr, "Cannot open display\n");
    exit(1);
  }

  s = DefaultScreen(d);
  w = XCreateSimpleWindow(d, RootWindow(d, s), 10, 10, 100, 100, 1,
                          BlackPixel(d, s), WhitePixel(d, s));
  XSelectInput(d, w,
               ExposureMask | KeyPressMask | ButtonPressMask |
                   ButtonReleaseMask | PointerMotionMask);
  XMapWindow(d, w);

  int i = 0;
  while (1) {
    XNextEvent(d, &e);
    if (e.type == Expose) {
      XFillRectangle(d, w, DefaultGC(d, s), 20, 20, i, 10);
      XDrawString(d, w, DefaultGC(d, s), 10, 50, msg, strlen(msg));
    }
    switch (e.type) {
    case ButtonPress:
      printf("Button press: button %u, x = %d, y = %d\n", e.xbutton.button,
             e.xbutton.x, e.xbutton.y);
      break;
    case ButtonRelease:
      printf("Button release: button %u, x = %d, y = %d\n", e.xbutton.button,
             e.xbutton.x, e.xbutton.y);
      break;
    case MotionNotify:
      printf("Motion: x = %d, y = %d\n", e.xmotion.x, e.xmotion.y);
      break;
    }
  }

  XCloseDisplay(d);
  return 0;
}
```

Y este sería el equivalente en Zig 
```zig
const std = @import("std");
const c = @cImport({
    @cInclude("X11/Xlib.h");
});

const XError = error{
    NullDisplay,
};

pub fn main() !void {
    const display = c.XOpenDisplay("") orelse return error.NullDisplay;
    defer _ = c.XCloseDisplay(display);

    const screen = c.XDefaultScreen(display);
    const rwindow = c.XRootWindow(display, screen);
    const black = c.BlackPixel(display, screen);
    const white = c.WhitePixel(display, screen);
    const window = c.XCreateSimpleWindow(display, rwindow, 10, 10, 100, 100, 1, black, white);

    _ = c.XSelectInput(display, window, c.ExposureMask | c.KeyPressMask | c.ButtonPressMask |
        c.ButtonReleaseMask | c.PointerMotionMask);
    _ = c.XMapWindow(display, window);

    var i: u32 = 0;
    var close = false;
    var event: c.XEvent = undefined;
    const msg: []const u8 = "EXAMPLE";
    while (!close) {
        _ = c.XNextEvent(display, &event);
        switch (event.type) {
            c.Expose => {
                const gc = c.DefaultGC(display, screen);
                _ = c.XFillRectangle(display, window, gc, 20, 20, i, 10);
                _ = c.XDrawString(display, window, gc, 10, 50, msg.ptr, msg.len);
            },
            c.ButtonPress => std.log.info(
                "Press {} x {} y {}",
                .{ event.xbutton.button, event.xbutton.x, event.xbutton.y },
            ),
            c.ButtonRelease => std.log.info(
                "Release {} x {} y {}",
                .{ event.xbutton.button, event.xbutton.x, event.xbutton.y },
            ),
            c.MotionNotify => std.log.info(
                "Motion x {} y {}",
                .{ event.xmotion.x, event.xmotion.y },
            ),
            c.DestroyNotify => close = true,
            else => {},
        }
    }
}

```
Como podemos ver, en zig se incluyen ciertas cosas que son buenas que no forman parte de c, como la funcionalidad de **defer**, manejar los errores
como valores y forzar a leerlos, demás de los nombres de los tipos que cuando se compila para otras arquitecturas el tamaño de las variables es más
explicito

Y el archivo de construccion (build.zig) para linkear las librerias de C quedaría como:

```zig
const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name = "zigexample",
        .root_source_file = .{ .path = "src/main.zig" },
        .target = target,
        .optimize = optimize,
    });

    exe.linkLibC();
    exe.linkSystemLibrary("x11");

    b.installArtifact(exe);

    const run_cmd = b.addRunArtifact(exe);
    run_cmd.step.dependOn(b.getInstallStep());
    if (b.args) |args| {
        run_cmd.addArgs(args);
    }

    const run_step = b.step("run", "Run the app");
    run_step.dependOn(&run_cmd.step);
}
```
