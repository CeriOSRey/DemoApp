/********* PluginDemo.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>

@interface PluginDemo : CDVPlugin {
  // Member variables go here.
}

- (void)coolMethod:(CDVInvokedUrlCommand*)command;
@end

@implementation PluginDemo

- (void)coolMethod:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    // NSString* echo = [command.arguments objectAtIndex:0];
    
    NSString *arg1 = [command.arguments objectAtIndex:0];
    NSString *arg2 = [command.arguments objectAtIndex:1];

    NSInteger int1 = [arg1 integerValue];
    NSInteger int2 = [arg2 integerValue];
    NSString *total = [NSString stringWithFormat: @"Total is %i", int1 + int2];

    if (total != nil && [total length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:total];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
