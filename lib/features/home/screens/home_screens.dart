import 'package:flutter/material.dart';
import 'package:amazon_clone/providers/user_provider.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context).user;
    return Scaffold(
      body: Center(
          child: Text(
        user.toString(),
      )),
    );
  }
}
